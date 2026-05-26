// gwasOS - Crypto Report Popup (Win98 Style)
let isDraggingPopup = false;
let popupOffsetX = 0;
let popupOffsetY = 0;

let cryptoPopup, titleBar;

// Initialize popup
function initGwasosPopup() {
  cryptoPopup = document.getElementById('gwasos-crypto-popup');
  titleBar = document.getElementById('gwasos-popup-titlebar');

  if (!cryptoPopup || !titleBar) return;

  // Draggable functionality
  titleBar.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'BUTTON') return;
    isDraggingPopup = true;
    popupOffsetX = e.clientX - cryptoPopup.offsetLeft;
    popupOffsetY = e.clientY - cryptoPopup.offsetTop;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDraggingPopup) {
      cryptoPopup.style.left = (e.clientX - popupOffsetX) + 'px';
      cryptoPopup.style.top = (e.clientY - popupOffsetY) + 'px';
      cryptoPopup.style.transform = 'none';
    }
  });

  document.addEventListener('mouseup', () => {
    isDraggingPopup = false;
  });
}

function showGwasosPopup() {
  if (!cryptoPopup) return;
  cryptoPopup.classList.remove('hidden');
  document.getElementById('popup-initial').classList.remove('hidden');
  document.getElementById('popup-email-form').classList.add('hidden');
}

function hideGwasosPopup() {
  if (!cryptoPopup) return;
  cryptoPopup.classList.add('hidden');
}

function showGwasosEmailForm() {
  document.getElementById('popup-initial').classList.add('hidden');
  document.getElementById('popup-email-form').classList.remove('hidden');
}

function handleGwasosSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('gwasos-email-input').value.trim();
  if (email) {
    console.log("Email captured for Crypto Report:", email);
    alert("✅ Thank you!\n\nYour Free Crypto Report has been sent to:\n" + email);
    hideGwasosPopup();
  }
}

// Auto-trigger after 4 seconds
window.addEventListener('load', () => {
  initGwasosPopup();
  setTimeout(showGwasosPopup, 4000);
});
