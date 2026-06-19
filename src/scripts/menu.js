function initMenu() {
  const header = document.getElementById('main-header');

  if (header) {
    function updateHeader() {
      if (window.scrollY > 80) {
        header.classList.remove('bg-transparent', 'py-6', 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]');
        header.classList.add('bg-stone-950', 'py-4');
      } else {
        header.classList.remove('bg-stone-950', 'py-4');
        header.classList.add('bg-transparent', 'py-6', 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]');
      }
    }
    window.addEventListener('scroll', updateHeader);
    updateHeader();
  }

  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('cat');
  const subParam = params.get('sub');

  if (catParam) {
    const targetCard = document.querySelector('.carta-card[data-category="' + catParam + '"]');
    if (targetCard) {
      targetCard.click();
      if (subParam) {
        setTimeout(function () {
          const panel = document.getElementById('panel-' + catParam);
          if (!panel) return;
          const subTab = panel.querySelector('.sub-tab[data-sub="' + sub + '"]');
          if (subTab) subTab.click();
        }, 150);
      }
    }
    if (history.replaceState) {
      history.replaceState({}, '', window.location.pathname);
    }
  }

  const cards = document.querySelectorAll('.carta-card');
  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      const category = this.getAttribute('data-category');
      cards.forEach(function (c) { c.classList.remove('active'); });
      this.classList.add('active');
      document.querySelectorAll('.carta-panels').forEach(function (p) {
        p.classList.remove('active');
      });
      const targetPanel = document.getElementById('panel-' + category);
      if (targetPanel) {
        targetPanel.classList.add('active');
        const firstSubTab = targetPanel.querySelector('.sub-tab');
        const firstSubContent = targetPanel.querySelector('.sub-content');
        if (firstSubTab) {
          targetPanel.querySelectorAll('.sub-tab').forEach(function (t) { t.classList.remove('active'); });
          firstSubTab.classList.add('active');
        }
        if (firstSubContent) {
          targetPanel.querySelectorAll('.sub-content').forEach(function (c) { c.classList.remove('active'); });
          firstSubContent.classList.add('active');
        }
        if (firstSubContent) {
          const scrollTarget = targetPanel.querySelector('.sub-tabs') || firstSubContent;
          const top = scrollTarget.getBoundingClientRect().top + window.pageYOffset - 140;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  document.querySelectorAll('.sub-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      const target = this.getAttribute('data-sub');
      const panel = this.closest('.carta-panels');
      if (panel) {
        panel.querySelectorAll('.sub-tab').forEach(function (t) { t.classList.remove('active'); });
        panel.querySelectorAll('.sub-content').forEach(function (c) { c.classList.remove('active'); });
        this.classList.add('active');
        const content = document.getElementById(target);
        if (content) {
          content.classList.add('active');
          const firstInner = content.querySelector('.inner-tab');
          if (firstInner) {
            content.querySelectorAll('.inner-tab').forEach(function (t) { t.classList.remove('active'); });
            content.querySelectorAll('.inner-content').forEach(function (c) { c.classList.remove('active'); });
            firstInner.classList.add('active');
            const innerTarget = document.getElementById(firstInner.getAttribute('data-inner'));
            if (innerTarget) innerTarget.classList.add('active');
          }
        }
      }
    });
  });

  document.querySelectorAll('.inner-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      const target = this.getAttribute('data-inner');
      const container = this.closest('.sub-content');
      if (container) {
        container.querySelectorAll('.inner-tab').forEach(function (t) { t.classList.remove('active'); });
        container.querySelectorAll('.inner-content').forEach(function (c) { c.classList.remove('active'); });
        this.classList.add('active');
        const targetContent = document.getElementById(target);
        if (targetContent) targetContent.classList.add('active');
      }
    });
  });

  const modal = document.getElementById('itemModal');
  if (modal) {
    const modalName = modal.querySelector('.modal-name');
    const modalDesc = modal.querySelector('.modal-desc');
    const modalPrice = modal.querySelector('.modal-price');
    const modalClose = modal.querySelector('.modal-close');

    function closeModal() {
      modal.classList.remove('active');
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    document.querySelectorAll('.menu-item').forEach(function (item) {
      item.addEventListener('click', function () {
        const nameEl = this.querySelector('.menu-item-name');
        const descEl = this.querySelector('.menu-item-desc');
        const priceEl = this.querySelector('.menu-item-price');

        if (modalName) modalName.textContent = nameEl ? nameEl.textContent.trim() : '';
        if (modalDesc) {
          modalDesc.textContent = descEl ? descEl.textContent.trim() : '';
          modalDesc.style.display = descEl ? '' : 'none';
        }
        if (modalPrice) modalPrice.innerHTML = priceEl ? priceEl.innerHTML : '';

        modal.classList.add('active');
      });
    });

    document.querySelectorAll('.vino-item').forEach(function (item) {
      item.addEventListener('click', function () {
        const nameEl = this.querySelector('.vino-item-name');
        const originEl = this.querySelector('.vino-item-origin');
        const pricesEl = this.querySelector('.vino-item-prices');

        if (modalName) modalName.textContent = nameEl ? nameEl.textContent.trim() : '';
        if (modalDesc) {
          modalDesc.textContent = originEl ? originEl.textContent.trim() : '';
          modalDesc.style.display = originEl ? '' : 'none';
        }
        if (modalPrice) modalPrice.innerHTML = pricesEl ? pricesEl.innerHTML : '';

        modal.classList.add('active');
      });
    });
  }

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleDrawer() {
    if (mobileDrawer) mobileDrawer.classList.toggle('translate-x-full');
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', toggleDrawer);
  mobileNavLinks.forEach(link => link.addEventListener('click', toggleDrawer));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMenu);
} else {
  initMenu();
}
