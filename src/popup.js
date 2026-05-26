// gwasOS - Crypto Report Popup (Win98 Style)
let isDraggingPopup = false;
let popupOffsetX = 0;
let popupOffsetY = 0;

let cryptoPopup, titleBar;

function initGwasosPopup() {
  cryptoPopup = document.getElementById('gwasos-crypto-popup');
  titleBar = document.getElementById('gwasos-popup-titlebar');

  if (!cryptoPopup || !titleBar) return;

  titleBar.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'BUTTON') return;

    isDraggingPopup = true;
    const rect = cryptoPopup.getBoundingClientRect();
    popupOffsetX = e.clientX - rect.left;
    popupOffsetY = e.clientY - rect.top;

    cryptoPopup.style.zIndex = 100000;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDraggingPopup || !cryptoPopup) return;

    const newX = e.clientX - popupOffsetX;
    const newY = e.clientY - popupOffsetY;

    cryptoPopup.style.left = newX + 'px';
    cryptoPopup.style.top = newY + 'px';
    cryptoPopup.style.transform = 'none';
  });

  document.addEventListener('mouseup', () => {
    isDraggingPopup = false;
  });
}

function showGwasosPopup() {
  if (!cryptoPopup) return;
  cryptoPopup.classList.remove('hidden');
  cryptoPopup.style.zIndex = 100000;
  document.getElementById('popup-initial').classList.remove('hidden');
  document.getElementById('popup-email-form').classList.add('hidden');
}

function hideGwasosPopup() {
  if (cryptoPopup) cryptoPopup.classList.add('hidden');
}

function showGwasosEmailForm() {
  document.getElementById('popup-initial').classList.add('hidden');
  document.getElementById('popup-email-form').classList.remove('hidden');
}

function handleGwasosSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('gwasos-email-input').value.trim();
  if (email) {
    alert("✅ Your Free Crypto Report has been sent to:\n" + email);
    hideGwasosPopup();
  }
}

// Initialize (No auto popup - controlled from index.html)
window.addEventListener('load', () => {
  initGwasosPopup();
});
