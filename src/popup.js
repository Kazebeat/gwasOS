// gwasOS - Enhanced Crypto Report Popup
let isDraggingPopup = false;
let popupOffsetX = 0;
let popupOffsetY = 0;

let cryptoPopup, titleBar;

// Initialize
function initGwasosPopup() {
  cryptoPopup = document.getElementById('gwasos-crypto-popup');
  titleBar = document.getElementById('gwasos-popup-titlebar');

  if (!cryptoPopup || !titleBar) {
    console.warn("Popup elements not found");
    return;
  }

  // Stronger draggable
  titleBar.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'BUTTON') return;
    
    isDraggingPopup = true;
    popupOffsetX = e.clientX - cryptoPopup.getBoundingClientRect().left;
    popupOffsetY = e.clientY - cryptoPopup.getBoundingClientRect().top;

    // Bring to front
    cryptoPopup.style.zIndex = 99999;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDraggingPopup && cryptoPopup) {
      const newLeft = e.clientX - popupOffsetX;
      const newTop = e.clientY - popupOffsetY;
      
      cryptoPopup.style.left = newLeft + 'px';
      cryptoPopup.style.top = newTop + 'px';
      cryptoPopup.style.transform = 'none';
    }
  });

  document.addEventListener('mouseup', () => {
    isDraggingPopup = false;
  });
}

// Show popup
function showGwasosPopup() {
  if (!cryptoPopup) return;
  cryptoPopup.classList.remove('hidden');
  cryptoPopup.style.zIndex = 99999; // Force on top
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
    console.log("Crypto Report Email:", email);
    alert("✅ Success!\n\nYour Free Crypto Report has been sent to:\n" + email);
    hideGwasosPopup();
  }
}

// Auto show
window.addEventListener('load', () => {
  initGwasosPopup();
  setTimeout(showGwasosPopup, 8000); // 8 seconds
});
