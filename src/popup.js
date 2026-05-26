// gwasOS Crypto Report Popup
let isDraggingPopup = false;
let popupOffsetX = 0, popupOffsetY = 0;
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
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDraggingPopup) return;
    cryptoPopup.style.left = (e.clientX - popupOffsetX) + 'px';
    cryptoPopup.style.top = (e.clientY - popupOffsetY) + 'px';
    cryptoPopup.style.transform = 'none';
  });

  document.addEventListener('mouseup', () => isDraggingPopup = false);
}

function showGwasosPopup() {
  if (!cryptoPopup) return;
  cryptoPopup.classList.remove('hidden');
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
    alert("✅ Report sent to: " + email);
    hideGwasosPopup();
  }
}

// Initialize
window.addEventListener('load', initGwasosPopup);
