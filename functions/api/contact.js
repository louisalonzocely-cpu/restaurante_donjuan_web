export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
  }

  const webhookUrl = env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    return new Response('Slack webhook not configured', { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const honeypot = typeof body.honeypot === 'string' ? body.honeypot : '';
  if (honeypot !== '') {
    return new Response('OK', { status: 200 });
  }

  const clean = (value) => (typeof value === 'string' ? value.trim() : '');
  const name = clean(body.name).slice(0, 80);
  const email = clean(body.email).slice(0, 254);
  const phone = clean(body.phone).slice(0, 20);
  const message = clean(body.message).slice(0, 1000);
  const subject = clean(body.subject).slice(0, 60) || 'Consulta General';
  const lang = clean(body.lang) === 'en' ? 'en' : 'es';

  if (!name || !email || !phone || !message) {
    return new Response('Missing required fields', { status: 400 });
  }
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
    return new Response('Invalid name', { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response('Invalid email', { status: 400 });
  }
  if (!/^[+0-9\s-]+$/.test(phone)) {
    return new Response('Invalid phone', { status: 400 });
  }

  const slackPayload = {
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: `Nuevo mensaje - ${subject}`, emoji: false }
      },
      { type: 'divider' },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Nombre:*\n${name}` },
          { type: 'mrkdwn', text: `*Correo:*\n${email}` },
          { type: 'mrkdwn', text: `*Telefono:*\n${phone}` },
          { type: 'mrkdwn', text: `*Asunto:*\n${subject}` }
        ]
      },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `*Mensaje:*\n${message}` }
      },
      {
        type: 'context',
        elements: [
          { type: 'mrkdwn', text: `Idioma: ${lang === 'en' ? 'English' : 'Espanol'} - Enviado desde la web donjuancartagena.com` }
        ]
      }
    ]
  };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(slackPayload)
  });

  if (!response.ok) {
    return new Response('Slack send failed', { status: 502 });
  }
  return new Response('OK', { status: 200 });
}
