export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = await request.json();

    const cleanName = (data.name || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]).trim();
    const cleanEmail = (data.email || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]).trim();
    const cleanPhone = (data.phone || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]).trim();
    const cleanMessage = (data.message || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]).trim();
    const subjectValue = data.subject || '';
    const lang = data.lang || 'es';

    const errors = [];
    if (cleanName.length > 80) errors.push('name');
    if (cleanPhone.length > 20) errors.push('phone');
    if (cleanMessage.length > 1000) errors.push('message');
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(cleanName)) errors.push('name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) errors.push('email');
    if (!/^[+0-9\s-]+$/.test(cleanPhone)) errors.push('phone');
    if (!cleanName || !cleanEmail || !cleanPhone || !cleanMessage) errors.push('required');

    if (errors.length > 0) {
      return new Response(JSON.stringify({ error: 'validation', fields: [...new Set(errors)] }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!env.EMAILJS_PRIVATE_KEY) {
      return new Response(JSON.stringify({ error: 'server_config' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: env.PUBLIC_EMAILJS_SERVICE_ID,
        template_id: env.PUBLIC_EMAILJS_TEMPLATE_ID,
        user_id: env.PUBLIC_EMAILJS_PUBLIC_KEY,
        accessToken: env.EMAILJS_PRIVATE_KEY,
        template_params: {
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          subject: subjectValue,
          message: cleanMessage,
          lang: lang,
        },
      }),
    });

    if (emailjsResponse.ok) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const errText = await emailjsResponse.text();
    console.error('EmailJS error:', emailjsResponse.status, errText);
    return new Response(JSON.stringify({ error: 'email_service', detail: errText }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('submit-form error:', e);
    return new Response(JSON.stringify({ error: 'server_error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
