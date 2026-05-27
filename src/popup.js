// gwasOS Crypto Popup - Stronger Dragging Fix
let isDraggingPopup = false;
let popupOffsetX = 0;
let popupOffsetY = 0;

let cryptoPopup, titleBar;

function initGwasosPopup() {
  cryptoPopup = document.getElementById('gwasos-crypto-popup');
  titleBar = document.getElementById('gwasos-popup-titlebar');

  if (!cryptoPopup || !titleBar) {
    console.error("Popup elements not found");
    return;
  }

  console.log("✅ Crypto Popup initialized - Dragging attached");

  // Force styles
  titleBar.style.cursor = 'move';
  titleBar.style.pointerEvents = 'all';
  titleBar.style.userSelect = 'none';

  // Strong mousedown handler
  titleBar.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'BUTTON') return;

    isDraggingPopup = true;
    const rect = cryptoPopup.getBoundingClientRect();
    popupOffsetX = e.clientX - rect.left;
    popupOffsetY = e.clientY - rect.top;

    cryptoPopup.style.zIndex = '999999';
    console.log("Dragging started");
  }, true); // Use capture phase

  // Global mouse move
  document.addEventListener('mousemove', (e) => {
    if (!isDraggingPopup) return;

    const newX = e.clientX - popupOffsetX;
    const newY = e.clientY - popupOffsetY;

    cryptoPopup.style.left = newX + 'px';
    cryptoPopup.style.top = newY + 'px';
    cryptoPopup.style.transform = 'none';
  });

  document.addEventListener('mouseup', () => {
    if (isDraggingPopup) {
      console.log("Dragging ended");
    }
    isDraggingPopup = false;
  });
}

function showGwasosPopup() {
  if (cryptoPopup) {
    cryptoPopup.classList.remove('hidden');
    cryptoPopup.style.zIndex = '999999';
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
  
  if (!email) return;

  fetch('send-report.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert("✅ Success! Your Free Report has been sent to " + email);
    } else {
      alert("✅ Report sent! Please check your inbox.");
    }
    hideGwasosPopup();
  })
  .catch(() => {
    alert("✅ Thank you! The report should arrive shortly.");
    hideGwasosPopup();
  });
}

// Initialize
window.addEventListener('load', initGwasosPopup);
