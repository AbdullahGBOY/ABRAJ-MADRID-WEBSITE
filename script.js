// script.js — للموقع الرئيسي فقط
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('navbar');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // التنقل السلس
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = header ? header.offsetHeight + 8 : 0;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  // الفورم
  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      form.reset();
      const msg = document.createElement('div');
      msg.className = 'success-msg';
      msg.textContent = '✅ تم إرسال رسالتك بنجاح!';
      form.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
    });
  }

  // سلايدر المعرض البسيط
  const galleryImages = ['gallery1.jpg','gallery2.jpg','gallery3.jpg','gallery4.jpg','gallery5.jpg'];
  let idx = 0;
  const img = document.querySelector('.gallery img');
  const prev = document.querySelector('.gallery-prev');
  const next = document.querySelector('.gallery-next');
  if (img && prev && next) {
    img.src = galleryImages[idx];
    prev.addEventListener('click', () => {
      idx = (idx - 1 + galleryImages.length) % galleryImages.length;
      img.src = galleryImages[idx];
    });
    next.addEventListener('click', () => {
      idx = (idx + 1) % galleryImages.length;
      img.src = galleryImages[idx];
    });
  }

  // زر الترجمة
  const langBtn = document.getElementById('lang-btn');
  const langMenu = document.getElementById('lang-menu');
  if (langBtn && langMenu) {
    langBtn.addEventListener('click', () => {
      langMenu.style.display = langMenu.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', e => {
      if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.style.display = 'none';
      }
    });
    langMenu.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', () => {
        const lang = li.getAttribute('data-lang');
        translatePage(lang);
        langMenu.style.display = 'none';
      });
    });
  }
});

// Google Translate API
function initTranslate() {
  new google.translate.TranslateElement({ pageLanguage: 'ar', autoDisplay: false }, 'google_translate_element');
}
function translatePage(lang) {
  const select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event('change'));
  }
}
