// gwasOS - Crypto Report Popup (Fixed Dragging for OS-GUI)
let isDraggingPopup = false;
let popupOffsetX = 0;
let popupOffsetY = 0;

let cryptoPopup, titleBar;

function initGwasosPopup() {
  cryptoPopup = document.getElementById('gwasos-crypto-popup');
  titleBar = document.getElementById('gwasos-popup-titlebar');

  if (!cryptoPopup || !titleBar) return;

  // Prevent conflicts with OS-GUI
  titleBar.style.pointerEvents = 'auto';
  titleBar.style.zIndex = '100000';

  titleBar.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'BUTTON') return;

    isDraggingPopup = true;
    const rect = cryptoPopup.getBoundingClientRect();
    popupOffsetX = e.clientX - rect.left;
    popupOffsetY = e.clientY - rect.top;

    // Bring popup to front
    cryptoPopup.style.zIndex = 100000;
  });

  // Global mouse handlers
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

// Auto show after 5 seconds (delayed to avoid boot screen)
window.addEventListener('load', () => {
  initGwasosPopup();
  
  // Give the OS time to fully initialize
  setTimeout(() => {
    if (typeof showGwasosPopup === 'function') {
      showGwasosPopup();
    }
  }, 5500); // 5.5 seconds
});
