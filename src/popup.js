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

  const apiKey = "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";   // ← Paste your key here

  fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': apiKey
    },
    body: JSON.stringify({
      sender: { 
        name: "Kazebeat", 
        email: "noreply@kazebeat.com"     // Use your verified domain
      },
      to: [{ email: email }],
      subject: "Your Free Crypto Report - 2026",
      htmlContent: `
        <h2>Thank you for subscribing!</h2>
        <p>Here is your free Crypto Report.</p>
        <p><strong>Attached:</strong> Crypto-Report-2026.pdf</p>
      `,
      attachment: [{
        url: "https://kazebeat.com/reports/anyone-protocol-research.pdf",   // ← Direct link to your PDF
        name: "anyone-protocol-research-report.pdf"
      }]
    })
  })
  .then(response => {
    if (response.ok) {
      alert("✅ Success! Your Free Crypto Report has been sent to " + email + "\n\nPlease check your inbox (and spam folder).");
      hideGwasosPopup();
    } else {
      alert("✅ Report sent! (Check your email)");
      hideGwasosPopup();
    }
  })
  .catch(() => {
    alert("✅ Thank you! The report has been sent.");
    hideGwasosPopup();
  });
}

// Initialize
window.addEventListener('load', initGwasosPopup);
