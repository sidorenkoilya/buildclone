// ============================
// БУРГЕР-МЕНЮ
// ============================

const burger = document.getElementById('burger');
const nav = document.getElementById('main-nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}



// ============================
// ФОРМА → ПОЧТА + WHATSAPP
// ============================

const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

// твой номер для WhatsApp
const DUTY_PHONE = "380964150145";

if (form && statusEl) {

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name') || '';
    const contacts = formData.get('contacts') || '';
    const msg = formData.get('message') || '';

    // отправка формы на почту (php)
    fetch('send.php', {
      method: 'POST',
      body: formData
    })
    .then(res => res.text())
    .then(response => {
      if(response.trim() === "OK"){
        statusEl.textContent = "Заявка відправлена успішно!";
        statusEl.style.color = "#22c55e";
      } else {
        statusEl.textContent = "Помилка відправлення.";
        statusEl.style.color = "#ef4444";
      }
    });

    // WhatsApp дублювання
    const text =
      `Нова заявка:%0A` +
      `Ім’я: ${name}%0A` +
      `Контакти: ${contacts}%0A` +
      `Повідомлення: ${msg}`;

    const waUrl = `https://wa.me/${DUTY_PHONE}?text=${text}`;
    window.open(waUrl, '_blank');

    form.reset();
  });
}
