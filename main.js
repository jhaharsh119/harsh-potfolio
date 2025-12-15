/* ================= SAFE PAGE LOADER ================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const loaderText = document.getElementById("loader-text");

  // Safety check
  if (!loader || !loaderText) {
    return;
  }

  const text = "Welcome to my portfolio website – Harsh Jha";
  let i = 0;

  function typeLoader() {
    if (i < text.length) {
      loaderText.textContent += text.charAt(i);
      i++;
      setTimeout(typeLoader, 60);
    } else {
      setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.transition = "opacity 0.8s ease";
        setTimeout(() => {
          loader.style.display = "none";
        }, 800);
      }, 800);
    }
  }

  typeLoader();
});


/* ================= HERO TYPING ================= */
const heroText =
  "Founder of SecuraX Infosec Solutions | Cybersecurity & Full-Stack Developer";

const typingEl = document.getElementById("typing");
let t = 0;

function heroTyping() {
  if (!typingEl) return;

  if (t < heroText.length) {
    typingEl.textContent += heroText.charAt(t);
    t++;
    setTimeout(heroTyping, 55);
  }
}

heroTyping();


/* ================= SCROLL REVEAL ================= */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 120) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* ================= CONTACT + WHATSAPP (FINAL WORKING) ================= */

const contactForm = document.querySelector(".contact-form");
const sendBtn = document.querySelector(".send-btn");

const WHATSAPP_NUMBER = "919834129580"; // Harsh ka number

if (contactForm && sendBtn) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // page reload stop

    sendBtn.innerHTML = "Sending...";
    sendBtn.disabled = true;

    const formData = new FormData(contactForm);

    // Send to Netlify
    fetch("/", {
      method: "POST",
      body: formData
    })
    .then(() => {

      const name = contactForm.elements["name"].value;
      const email = contactForm.elements["email"].value;
      const message = contactForm.elements["message"].value;

      // ✅ SINGLE LINE STRING (IMPORTANT FIX)
      const whatsappMessage =
        "Hello Harsh 👋\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Message: " + message;

      const encodedMessage = encodeURIComponent(whatsappMessage);

      // ✅ BEST URL FOR MOBILE
      const whatsappURL =
        "https://api.whatsapp.com/send?phone=" +
        WHATSAPP_NUMBER +
        "&text=" +
        encodedMessage;

      // UI success
      sendBtn.innerHTML = "Message Sent ✓";
      sendBtn.classList.add("sent");

      // WhatsApp open (guaranteed)
      setTimeout(() => {
        window.location.href = whatsappURL;
      }, 500);

      contactForm.reset();
    })
    .catch(() => {
      sendBtn.innerHTML = "Error ❌";
      sendBtn.disabled = false;
    });
  });
}
