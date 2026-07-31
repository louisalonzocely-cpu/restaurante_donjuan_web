function initMain() {
  const lang = document.documentElement.lang || 'es';

  const msg = lang === 'en' ? {
    cooldown: 'For security, please wait {seconds} seconds before sending another message.',
    tooFast: 'The form was submitted too quickly. Please wait a few seconds.',
    hourlyLimit: 'You have reached the maximum number of messages per hour. Please try again later.',
    dailyLimit: 'You have reached the maximum number of messages for today. Please contact us by phone.',
    nameLong: 'The name is too long (maximum 80 characters).',
    phoneLong: 'The phone number is too long (maximum 20 characters).',
    msgLong: 'The message is too long (maximum 1000 characters).',
    nameInvalid: 'Please enter a valid name (letters and spaces only).',
    emailInvalid: 'Please enter a valid email address.',
    phoneInvalid: 'Please enter a valid phone number.',
    sending: 'Sending...',
    success: 'Thank you, {name}! Your message has been sent successfully.',
    error: 'An error occurred. Please try again or contact us by phone.',
    selectLabels: {
      reserva: 'Special Table Reservation',
      evento: 'Private Event / Weddings',
      catering: 'Catering Service',
      consulta: 'General Inquiry'
    }
  } : {
    cooldown: 'Por seguridad, por favor espera {seconds} segundos antes de enviar otro mensaje.',
    tooFast: 'El formulario se ha enviado demasiado rápido. Por favor, espera unos segundos.',
    hourlyLimit: 'Has alcanzado el máximo de mensajes por hora. Intenta de nuevo más tarde.',
    dailyLimit: 'Has alcanzado el máximo de mensajes para hoy. Contáctanos por teléfono.',
    nameLong: 'El nombre es demasiado largo (máximo 80 caracteres).',
    phoneLong: 'El teléfono es demasiado largo (máximo 20 caracteres).',
    msgLong: 'El mensaje es demasiado largo (máximo 1000 caracteres).',
    nameInvalid: 'Por favor introduce un nombre válido (letras y espacios únicamente).',
    emailInvalid: 'Por favor introduce un correo electrónico válido.',
    phoneInvalid: 'Por favor introduce un número de teléfono válido.',
    sending: 'Enviando...',
    success: '¡Gracias, {name}! Tu mensaje ha sido enviado con éxito.',
    error: 'Ocurrió un error. Intenta de nuevo o contáctanos por teléfono.',
    selectLabels: {
      reserva: 'Reserva de Mesa Especial',
      evento: 'Evento Privado / Bodas',
      catering: 'Servicio de Catering',
      consulta: 'Consulta General'
    }
  };

  const header = document.getElementById('main-header');
  const heroSlides = document.querySelectorAll('.carousel-slide');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.remove('bg-transparent', 'py-6', 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]');
      header.classList.add('bg-stone-950', 'py-4');
    } else {
      header.classList.remove('bg-stone-950', 'py-4');
      header.classList.add('bg-transparent', 'py-6', 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]');
    }
    const heroOffset = window.scrollY * 0.4;
    heroSlides.forEach(slide => {
      slide.style.transform = 'translateY(' + heroOffset + 'px)';
    });
  });

  const logo = document.querySelector('#main-header a[href="/"], #main-header a[href="/en"]');
  if (logo) {
    logo.addEventListener('click', (e) => {
      if (window.location.pathname === '/' || window.location.pathname === '/en/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        header.classList.remove('bg-stone-950', 'py-4');
        header.classList.add('bg-transparent', 'py-6', 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]');
      }
    });
  }

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleDrawer() {
    mobileDrawer.classList.toggle('translate-x-full');
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', toggleDrawer);
  mobileNavLinks.forEach(link => link.addEventListener('click', toggleDrawer));

  const tabButtons = document.querySelectorAll('.menu-tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const tabId = this.getAttribute('data-tab');
      if (!tabId) return;

      const panels = document.querySelectorAll('.menu-category-panel');
      panels.forEach(panel => {
        panel.classList.add('hidden');
        panel.classList.remove('grid', 'opacity-100', 'scale-100');
        panel.classList.add('opacity-0', 'scale-95');
      });

      tabButtons.forEach(b => {
        b.classList.remove('active', 'border-gold-500', 'text-gold-400');
        b.classList.add('border-transparent', 'text-stone-400', 'hover:text-white');
      });

      const activePanel = document.getElementById(tabId);
      if (activePanel) {
        activePanel.classList.remove('hidden');
        activePanel.classList.add('grid');
        setTimeout(() => {
          activePanel.classList.remove('opacity-0', 'scale-95');
          activePanel.classList.add('opacity-100', 'scale-100');
        }, 50);
      }

      this.classList.add('active', 'border-gold-500', 'text-gold-400');
      this.classList.remove('border-transparent', 'text-stone-400', 'hover:text-white');
    });
  });

  const galleryCaptions = lang === 'en' ? [
    'Sophisticated atmosphere of Restaurante donjuan',
    'Highly professional and impeccable service',
    'Artisanal cocktails and signature drinks at our bar',
    'Artisanal fishing and fresh local seafood',
    'Our talented kitchen and service team',
    'View of Restaurante donjuan',
    'Elegant celebrations and boutique weddings in the historic center',
    'Private VIP dinners and exclusive signature catering'
  ] : [
    'Atmósfera sofisticada del Restaurante donjuan',
    'Servicio altamente profesional e impecable',
    'Coctelería artesanal y cócteles de autor en nuestra barra',
    'Pesca artesanal y frescos mariscos locales',
    'Nuestro talentoso equipo de cocina',
    'Vista del Restaurante donjuan',
    'Celebraciones elegantes y bodas boutique en el centro histórico',
    'Cenas privadas VIP y catering exclusivo de autor'
  ];

  const galleryImages = [
    { src: '/images/Don-Juan-Restaurant.webp', caption: galleryCaptions[0] },
    { src: '/images/Don-Juan-Servicio.webp', caption: galleryCaptions[1] },
    { src: '/images/Don-Juan-Restaurant-Cocteles.webp', caption: galleryCaptions[2] },
    { src: '/images/banner-pulpo.webp', caption: galleryCaptions[3] },
    { src: '/images/equipo-donjuan.webp', caption: galleryCaptions[4] },
    { src: '/images/restaurante.webp', caption: galleryCaptions[5] },
    { src: '/images/celebraciones.webp', caption: galleryCaptions[6] },
    { src: '/images/evento.webp', caption: galleryCaptions[7] }
  ];

  let currentImgIndex = 0;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  function openLightbox(index) {
    currentImgIndex = index;
    if (lightboxImg) lightboxImg.src = galleryImages[index].src;
    if (lightboxCaption) lightboxCaption.textContent = galleryImages[index].caption;
    if (lightbox) {
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('flex');
      lightbox.classList.add('hidden');
    }
    document.body.style.overflow = 'auto';
  }

  function nextImage() {
    currentImgIndex = (currentImgIndex + 1) % galleryImages.length;
    if (lightboxImg) lightboxImg.src = galleryImages[currentImgIndex].src;
    if (lightboxCaption) lightboxCaption.textContent = galleryImages[currentImgIndex].caption;
  }

  function prevImage() {
    currentImgIndex = (currentImgIndex - 1 + galleryImages.length) % galleryImages.length;
    if (lightboxImg) lightboxImg.src = galleryImages[currentImgIndex].src;
    if (lightboxCaption) lightboxCaption.textContent = galleryImages[currentImgIndex].caption;
  }

  document.querySelectorAll('.gallery-item').forEach(el => {
    el.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'));
      if (!isNaN(index)) openLightbox(index);
    });
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-lightbox-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-lightbox-action');
    if (action === 'close') closeLightbox();
    if (action === 'next') nextImage();
    if (action === 'prev') prevImage();
  });

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.remove('opacity-0', 'pointer-events-none');
        backToTop.classList.add('opacity-100');
      } else {
        backToTop.classList.remove('opacity-100');
        backToTop.classList.add('opacity-0', 'pointer-events-none');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const form = document.getElementById('reservation-form');
  const successOverlay = document.getElementById('form-success');
  const resetBtn = document.getElementById('reset-form-btn');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
  const statusDiv = document.getElementById('form-status');
  let submissionInProgress = false;
  let statusTimeout;

  function showStatus(message, type) {
    if (!statusDiv) return;
    clearTimeout(statusTimeout);
    statusDiv.className = 'mt-4 p-4 border text-sm font-sans leading-relaxed transition-all duration-300 rounded-none';
    if (type === 'error') {
      statusDiv.className += ' border-red-500/50 bg-red-500/10 text-red-400';
    } else if (type === 'success') {
      statusDiv.className += ' border-emerald-500/50 bg-emerald-500/10 text-emerald-400';
    } else {
      statusDiv.className += ' border-gold-500/50 bg-gold-500/10 text-gold-400';
    }
    statusDiv.textContent = message;
    statusDiv.classList.remove('hidden');
    statusTimeout = setTimeout(() => {
      statusDiv.classList.add('hidden');
    }, 8000);
  }

  function sanitizeHTML(str) {
    return str.replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    }).trim();
  }

  function getSubjectLabel(value) {
    return msg.selectLabels[value] || value;
  }

  const RATE_LIMIT = {
    COOLDOWN_MS: 120000,
    MAX_PER_HOUR: 3,
    MAX_PER_DAY: 10,
    HOUR_MS: 3600000,
    DAY_MS: 86400000
  };

  function getStoredTimestamps() {
    try {
      return JSON.parse(localStorage.getItem('form_submit_timestamps') || '[]');
    } catch {
      return [];
    }
  }

  function checkRateLimit() {
    const now = Date.now();
    const timestamps = getStoredTimestamps();
    const recent = timestamps.filter(t => now - t < RATE_LIMIT.DAY_MS);

    if (recent.length > 0) {
      const elapsed = now - recent[recent.length - 1];
      if (elapsed < RATE_LIMIT.COOLDOWN_MS) {
        const seconds = Math.ceil((RATE_LIMIT.COOLDOWN_MS - elapsed) / 1000);
        return { allowed: false, message: msg.cooldown.replace('{seconds}', seconds) };
      }
    }

    const lastHour = recent.filter(t => now - t < RATE_LIMIT.HOUR_MS);
    if (lastHour.length >= RATE_LIMIT.MAX_PER_HOUR) {
      return { allowed: false, message: msg.hourlyLimit };
    }

    if (recent.length >= RATE_LIMIT.MAX_PER_DAY) {
      return { allowed: false, message: msg.dailyLimit };
    }

    return { allowed: true };
  }

  function recordSubmission() {
    const cutoff = Date.now() - RATE_LIMIT.DAY_MS;
    const timestamps = getStoredTimestamps().filter(t => t > cutoff);
    timestamps.push(Date.now());
    try {
      localStorage.setItem('form_submit_timestamps', JSON.stringify(timestamps));
    } catch {
      // localStorage full or unavailable — submission still proceeds
    }
  }

  function setSubmitState(loading) {
    submissionInProgress = loading;
    if (!submitBtn) return;
    submitBtn.disabled = loading || !form || !form.checkValidity();
    submitBtn.textContent = loading ? msg.sending : (submitBtn.getAttribute('data-original-text') || submitBtn.textContent);
  }

  async function notifySlack(payload) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        console.log('Slack notification sent');
      } else {
        console.warn('Slack notification failed:', res.status, await res.text().catch(() => ''));
      }
    } catch (e) {
      console.error('Slack notify error:', e);
    }
  }

  if (form && submitBtn) {
    submitBtn.setAttribute('data-original-text', submitBtn.textContent);

    const requiredFields = form.querySelectorAll('[required]');
    function checkFormValidity() {
      let allValid = true;
      requiredFields.forEach(f => {
        if (f.type === 'checkbox') {
          if (!f.checked) allValid = false;
        } else {
          if (!f.value.trim()) allValid = false;
        }
      });
      submitBtn.disabled = !allValid;
    }
    requiredFields.forEach(f => f.addEventListener('input', checkFormValidity));
    requiredFields.forEach(f => f.addEventListener('change', checkFormValidity));
    checkFormValidity();

    const formStartTime = Date.now();

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (submissionInProgress) return;

      if (Date.now() - formStartTime < 3000) {
        showStatus(msg.tooFast, 'error');
        return;
      }

      const honeypot = document.getElementById('honeypot');
      if (honeypot && honeypot.value !== '') return;

      const rateLimit = checkRateLimit();
      if (!rateLimit.allowed) {
        showStatus(rateLimit.message, 'error');
        return;
      }

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
      const messageInput = document.getElementById('message');
      const typeInput = document.getElementById('type');

      const cleanName = sanitizeHTML(nameInput ? nameInput.value : '');
      const cleanEmail = sanitizeHTML(emailInput ? emailInput.value : '');
      const cleanPhone = sanitizeHTML(phoneInput ? phoneInput.value : '');
      const cleanMessage = sanitizeHTML(messageInput ? messageInput.value : '');
      const subjectValue = typeInput ? typeInput.value : 'consulta';
      const subjectLabel = getSubjectLabel(subjectValue);

      if (cleanName.length > 80) { showStatus(msg.nameLong, 'error'); return; }
      if (cleanPhone.length > 20) { showStatus(msg.phoneLong, 'error'); return; }
      if (cleanMessage.length > 1000) { showStatus(msg.msgLong, 'error'); return; }

      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(cleanName)) {
        showStatus(msg.nameInvalid, 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        showStatus(msg.emailInvalid, 'error');
        return;
      }
      if (!/^[+0-9\s-]+$/.test(cleanPhone)) {
        showStatus(msg.phoneInvalid, 'error');
        return;
      }

      setSubmitState(true);

      try {
        const directResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
            template_id: import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
            user_id: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY,
            template_params: {
              name: cleanName,
              email: cleanEmail,
              phone: cleanPhone,
              subject: subjectLabel,
              message: cleanMessage,
              lang: lang
            }
          })
        });

        if (directResponse.ok) {
          recordSubmission();
          showStatus(msg.success.replace('{name}', cleanName), 'success');
          if (successOverlay) successOverlay.classList.remove('hidden');
          if (form) form.reset();
          notifySlack({ name: cleanName, email: cleanEmail, phone: cleanPhone, subject: subjectLabel, message: cleanMessage, lang, honeypot: honeypot ? honeypot.value : '' });
        } else {
          showStatus(msg.error, 'error');
        }
      } catch (e) {
        console.error('Submit error:', e);
        showStatus(msg.error, 'error');
      } finally {
        setSubmitState(false);
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (form) form.reset();
      if (successOverlay) successOverlay.classList.add('hidden');
    });
  }

  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  let current = 0;
  let interval;

  function goTo(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => { d.classList.remove('active', 'bg-white/80'); d.classList.add('bg-white/40'); });
    slides[index].classList.add('active');
    dots[index].classList.add('active', 'bg-white/80');
    dots[index].classList.remove('bg-white/40');
    current = index;
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function startAutoPlay() {
    interval = setInterval(next, 5000);
  }

  function stopAutoPlay() {
    clearInterval(interval);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      stopAutoPlay();
      goTo(parseInt(this.dataset.index));
      startAutoPlay();
    });
  });

  // Auto-accordion gallery (mobile)
  const accordion = document.querySelector('.gallery-auto-accordion');
  if (accordion) {
    const panels = accordion.querySelectorAll('.accordion-panel');
    let current = 0;
    let accordionTimer;

    function activateAccordion(index) {
      panels.forEach((p, i) => {
        const content = p.querySelector('.accordion-content');
        p.classList.toggle('active', i === index);
        if (content) {
          content.style.maxHeight = i === index ? content.scrollHeight + 'px' : '0';
        }
      });
      current = index;
    }

    function nextAccordion() {
      if (panels.length) activateAccordion((current + 1) % panels.length);
    }

    function startAccordionAuto() {
      stopAccordionAuto();
      accordionTimer = setInterval(nextAccordion, 3500);
    }

    function stopAccordionAuto() {
      clearInterval(accordionTimer);
    }

    panels.forEach((panel) => {
      const header = panel.querySelector('.accordion-header');
      if (header) {
        header.addEventListener('click', function () {
          const idx = parseInt(panel.getAttribute('data-index'));
          if (!isNaN(idx)) {
            stopAccordionAuto();
            activateAccordion(idx);
            startAccordionAuto();
          }
        });
      }
    });

    activateAccordion(0);
    startAccordionAuto();
  }

  const carousel = document.getElementById('hero-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  }

  startAutoPlay();

  window.openLightbox = openLightbox;

  window.showMoreGallery = function () {
    const hiddenItems = document.querySelectorAll('.gallery-item.gallery-hidden');
    if (hiddenItems.length > 0) {
      const index = parseInt(hiddenItems[0].getAttribute('data-index'));
      if (!isNaN(index)) openLightbox(index);
    }
  };

  
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain);
} else {
  initMain();
}
