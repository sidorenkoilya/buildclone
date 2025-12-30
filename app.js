// =========================
// BudTechCrane — app.js
// =========================

// burger menu (mobile / tablet)
const burger = document.getElementById('burger');
const nav = document.getElementById('main-nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // close menu after click on link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

// =========================
// contact form: email + WhatsApp
// =========================
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

// черговий номер (WhatsApp)
const DUTY_PHONE = "380964150145";

if (form && statusEl) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const name = (fd.get('name') || '').toString().trim();
    const contacts = (fd.get('contacts') || '').toString().trim();
    const message = (fd.get('message') || '').toString().trim();

    // ---------- PHP (email) ----------
    try {
      const res = await fetch('send.php', {
        method: 'POST',
        body: fd
      });

      const text = (await res.text()).trim();

      if (text === 'OK') {
        statusEl.textContent = "Заявка відправлена ✅";
        statusEl.style.color = "#22c55e";
      } else {
        statusEl.textContent = "Помилка відправлення (сервер).";
        statusEl.style.color = "#ef4444";
      }
    } catch (err) {
      statusEl.textContent = "Локальний режим: PHP недоступний.";
      statusEl.style.color = "#ef4444";
    }

    // ---------- WhatsApp ----------
    const waText =
      `Нова заявка:%0A` +
      `Ім’я: ${encodeURIComponent(name)}%0A` +
      `Контакти: ${encodeURIComponent(contacts)}%0A` +
      `Повідомлення: ${encodeURIComponent(message)}`;

    window.open(
      `https://wa.me/${DUTY_PHONE}?text=${waText}`,
      '_blank'
    );

    form.reset();
  });
}
