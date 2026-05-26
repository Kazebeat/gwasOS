// gwasOS Crypto Popup - Dragging Fixed
let isDraggingPopup = false;
let popupOffsetX = 0;
let popupOffsetY = 0;

let cryptoPopup, titleBar;

function initGwasosPopup() {
  cryptoPopup = document.getElementById('gwasos-crypto-popup');
  titleBar = document.getElementById('gwasos-popup-titlebar');

  if (!cryptoPopup || !titleBar) {
    console.error("Popup elements not found for dragging");
    return;
  }

  console.log("✅ Draggable popup initialized");

  titleBar.style.cursor = "move";

  titleBar.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'BUTTON') return;

    isDraggingPopup = true;
    const rect = cryptoPopup.getBoundingClientRect();
    popupOffsetX = e.clientX - rect.left;
    popupOffsetY = e.clientY - rect.top;

    cryptoPopup.style.zIndex = 100000;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDraggingPopup) return;

    cryptoPopup.style.left = (e.clientX - popupOffsetX) + 'px';
    cryptoPopup.style.top = (e.clientY - popupOffsetY) + 'px';
    cryptoPopup.style.transform = 'none';
  });

  document.addEventListener('mouseup', () => {
    isDraggingPopup = false;
  });
}

function showGwasosPopup() {
  if (cryptoPopup) cryptoPopup.classList.remove('hidden');
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

// Initialize
window.addEventListener('load', initGwasosPopup);
