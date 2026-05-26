// gwasOS - Crypto Report Popup - Improved Dragging
let isDraggingPopup = false;
let popupOffsetX = 0;
let popupOffsetY = 0;

let cryptoPopup, titleBar;

function initGwasosPopup() {
  cryptoPopup = document.getElementById('gwasos-crypto-popup');
  titleBar = document.getElementById('gwasos-popup-titlebar');

  if (!cryptoPopup || !titleBar) {
    console.error("Crypto popup elements not found!");
    return;
  }

  console.log("Crypto popup initialized");

  // Stronger dragging setup
  titleBar.style.cursor = 'move';
  titleBar.style.pointerEvents = 'auto';

  titleBar.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'BUTTON') return;

    isDraggingPopup = true;
    const rect = cryptoPopup.getBoundingClientRect();
    popupOffsetX = e.clientX - rect.left;
    popupOffsetY = e.clientY - rect.top;

    // Bring to front
    cryptoPopup.style.zIndex = '100000';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDraggingPopup) return;

    const newLeft = e.clientX - popupOffsetX;
    const newTop = e.clientY - popupOffsetY;

    cryptoPopup.style.left = newLeft + 'px';
    cryptoPopup.style.top = newTop + 'px';
    cryptoPopup.style.transform = 'none';
  });

  document.addEventListener('mouseup', () => {
    isDraggingPopup = false;
  });
}

// Core functions
function showGwasosPopup() {
  if (cryptoPopup) {
    cryptoPopup.classList.remove('hidden');
    cryptoPopup.style.zIndex = '100000';
  }
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
window.addEventListener('load', () => {
  initGwasosPopup();
});
