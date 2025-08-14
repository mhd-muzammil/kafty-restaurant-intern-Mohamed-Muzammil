// Enhanced Interactive JavaScript for BontaTea Café

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
  setupNavigation();
  setupScrollEffects();
  setupFormHandling();
  setupInteractiveElements();
  setupFloatingElements();
  setupParallaxEffects();
}

// Navigation Setup
function setupNavigation() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Mobile menu functionality
  const mobileMenu = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenu) {
    mobileMenu.addEventListener("click", function () {
      navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
      this.style.transform =
        this.style.transform === "rotate(90deg)"
          ? "rotate(0deg)"
          : "rotate(90deg)";
    });
  }
}

// Scroll Effects
function setupScrollEffects() {
  // Enhanced navbar scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar.style.background =
        "linear-gradient(135deg, rgba(62,39,35,0.98), rgba(255,69,0,0.98))";
      navbar.style.boxShadow = "0 15px 35px rgba(255,69,0,0.4)";
    } else {
      navbar.style.background =
        "linear-gradient(135deg, rgba(62,39,35,0.95), rgba(93,64,55,0.95))";
      navbar.style.boxShadow = "0 8px 25px rgba(62,39,35,0.3)";
    }
  });

  // Parallax effect for hero section
  window.addEventListener("scroll", function () {
    const hero = document.querySelector(".hero");
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;

    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  });

  // Section reveal animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(section);
  });
}

// Form Handling
function setupFormHandling() {
  // Set minimum date to today
  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  // Enhanced form validation and submission
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleBookingSubmission(this);
    });
  }

  // Real-time form validation
  setupFormValidation();
}

// Handle booking form submission
function handleBookingSubmission(form) {
  // Get form data
  const formData = new FormData(form);
  const bookingData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    guests: formData.get("guests"),
    date: formData.get("date"),
    time: formData.get("time"),
    message: formData.get("message") || "None",
  };

  // Validate required fields
  if (!validateBookingData(bookingData)) {
    return;
  }

  // Show success animation
  showBookingSuccessAnimation();

  // Enhanced booking confirmation alert
  setTimeout(() => {
    alert(
      "🎉 Table Booked Successfully at BontaTea Café!\n\nவெற்றிகரமாக முன்பதிவு செய்யப்பட்டது!\n\nYour Tamil dining experience awaits! We'll contact you shortly."
    );
  }, 500);

  // Display booking details
  displayBookingConfirmation(bookingData);

  // Reset form
  form.reset();
}

// Validate booking data
function validateBookingData(data) {
  const requiredFields = ["name", "email", "phone", "guests", "date", "time"];

  for (let field of requiredFields) {
    if (!data[field] || data[field].trim() === "") {
      alert(`Please fill in the ${field} field.`);
      return false;
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Phone validation (basic)
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  if (!phoneRegex.test(data.phone)) {
    alert("Please enter a valid phone number.");
    return false;
  }

  return true;
}

// Show booking success animation
function showBookingSuccessAnimation() {
  // Create success popup
  const successPopup = document.createElement("div");
  successPopup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #FFD700, #FF4500);
        color: white;
        padding: 2rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        animation: popupAnimation 2s ease-in-out;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    `;
  successPopup.innerHTML = "🎉 Booking Confirmed! 🎉";

  // Add animation keyframes
  const style = document.createElement("style");
  style.textContent = `
        @keyframes popupAnimation {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
        }
    `;
  document.head.appendChild(style);

  document.body.appendChild(successPopup);

  // Remove popup after animation
  setTimeout(() => {
    document.body.removeChild(successPopup);
    document.head.removeChild(style);
  }, 2000);
}

// Display booking confirmation
function displayBookingConfirmation(bookingData) {
  const confirmationDiv = document.getElementById("confirmationDetails");
  const bookingDate = new Date(bookingData.date);
  const formattedDate = bookingDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (confirmationDiv) {
    confirmationDiv.innerHTML = `
            <div style="background: linear-gradient(45deg, rgba(255,215,0,0.2), rgba(255,69,0,0.2)); padding: 2rem; border-radius: 15px; margin-bottom: 1rem; border: 2px solid var(--golden);">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px;">
                        <strong style="color: var(--golden); font-size: 1.1rem;">🙋‍♂️ Guest Information:</strong><br>
                        <span style="color: var(--light-cream);">Name: ${bookingData.name}</span><br>
                        <span style="color: var(--light-cream);">Email: ${bookingData.email}</span><br>
                        <span style="color: var(--light-cream);">Phone: ${bookingData.phone}</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px;">
                        <strong style="color: var(--golden); font-size: 1.1rem;">🍽️ Reservation Details:</strong><br>
                        <span style="color: var(--light-cream);">Date: ${formattedDate}</span><br>
                        <span style="color: var(--light-cream);">Time: ${bookingData.time}</span><br>
                        <span style="color: var(--light-cream);">Guests: ${bookingData.guests}</span>
                    </div>
                </div>
                <div style="margin-top: 1.5rem; background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px;">
                    <strong style="color: var(--golden); font-size: 1.1rem;">🌟 Special Requests:</strong><br>
                    <span style="color: var(--light-cream);">${bookingData.message}</span>
                </div>
                <div style="text-align: center; margin-top: 1rem; font-size: 1.5rem;">
                    🫖 ☕ 🍵 🧋 🥤
                </div>
            </div>
        `;
  }

  // Show confirmation section with animation
  const confirmation = document.getElementById("bookingConfirmation");
  if (confirmation) {
    confirmation.classList.add("show");

    // Scroll to confirmation smoothly
    setTimeout(() => {
      confirmation.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300);
  }
}

// Real-time form validation
function setupFormValidation() {
  const inputs = document.querySelectorAll("input[required], select[required]");

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      clearFieldError(this);
    });
  });
}

// Validate individual field
function validateField(field) {
  const value = field.value.trim();

  if (!value) {
    showFieldError(field, "This field is required");
    return false;
  }

  if (field.type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showFieldError(field, "Please enter a valid email address");
      return false;
    }
  }

  if (field.type === "tel") {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(value)) {
      showFieldError(field, "Please enter a valid phone number");
      return false;
    }
  }

  clearFieldError(field);
  return true;
}

// Show field error
function showFieldError(field, message) {
  clearFieldError(field);

  field.style.borderColor = "#ff4444";

  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.style.cssText = `
        color: #ff4444;
        font-size: 0.8rem;
        margin-top: 0.5rem;
    `;
  errorDiv.textContent = message;

  field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
  field.style.borderColor = "";

  const errorDiv = field.parentNode.querySelector(".field-error");
  if (errorDiv) {
    errorDiv.remove();
  }
}

// Interactive Elements Setup
function setupInteractiveElements() {
  // Enhanced menu item hover effects
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.background =
        "linear-gradient(45deg, rgba(255,69,0,0.15), rgba(255,215,0,0.15))";
      this.style.borderLeft = "5px solid var(--deep-orange)";
      this.style.transform = "translateX(15px) scale(1.02)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.background = "";
      this.style.borderLeft = "";
      this.style.transform = "";
    });
  });

  // Contact item hover effects
  document.querySelectorAll(".contact-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(15px) scale(1.05)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  // Button hover sound effect (visual feedback)
  document.querySelectorAll("button, .cta-button").forEach((button) => {
    button.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });
}

// Floating Elements
function setupFloatingElements() {
  // Create dynamic floating tea elements
  function createFloatingTea() {
    const teas = ["🫖", "☕", "🍵", "🧋", "🥤", "🍯", "🌿"];
    const tea = document.createElement("div");
    tea.className = "floating-tea";
    tea.textContent = teas[Math.floor(Math.random() * teas.length)];
    tea.style.left = Math.random() * 90 + "%";
    tea.style.top = Math.random() * 80 + "%";
    tea.style.animationDelay = Math.random() * 6 + "s";
    tea.style.fontSize = Math.random() * 1 + 1.5 + "rem";

    document.body.appendChild(tea);

    // Remove element after animation
    setTimeout(() => {
      if (tea.parentNode) {
        tea.parentNode.removeChild(tea);
      }
    }, 10000);
  }

  // Create floating elements periodically
  setInterval(createFloatingTea, 4000);

  // Create initial floating elements
  for (let i = 0; i < 3; i++) {
    setTimeout(createFloatingTea, i * 1000);
  }
}

// Parallax Effects
function setupParallaxEffects() {
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset;

    // Parallax for section backgrounds
    document.querySelectorAll(".section").forEach((section, index) => {
      const speed = 0.1 + index * 0.05;
      const yPos = -(scrollTop * speed);
      section.style.backgroundPosition = `center ${yPos}px`;
    });
  });
}

// Loading Animation
window.addEventListener("load", function () {
  document.body.style.opacity = "1";

  // Add entrance animation to main elements
  const elementsToAnimate = [
    ".navbar",
    ".hero-content",
    ".menu-category",
    ".contact-info",
    ".booking-form",
  ];

  elementsToAnimate.forEach((selector, index) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";

      setTimeout(() => {
        element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, index * 200);
    });
  });

  // Create initial floating elements
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      if (typeof createFloatingTea === "function") {
        createFloatingTea();
      }
    }, i * 800);
  }
});

// Advanced Interactive Features
function setupAdvancedFeatures() {
  // Typing effect for hero tagline
  const tagline = document.querySelector(".hero-tagline");
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 1000);
  }

  // Menu category counter animation
  animateMenuCounts();

  // Add glow effect to important elements
  addGlowEffects();
}

// Animate menu item counts
function animateMenuCounts() {
  const categories = document.querySelectorAll(".menu-category");

  categories.forEach((category) => {
    const items = category.querySelectorAll(".menu-item");
    const title = category.querySelector(".category-title");

    if (title && items.length > 0) {
      const originalText = title.textContent;
      title.textContent = `${originalText} (${items.length} items)`;
    }
  });
}

// Add glow effects to special elements
function addGlowEffects() {
  const glowElements = [
    ".logo",
    ".cta-button",
    ".submit-btn",
    ".section-title",
  ];

  glowElements.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.addEventListener("mouseenter", function () {
        this.style.filter = "drop-shadow(0 0 15px rgba(255, 215, 0, 0.8))";
      });

      element.addEventListener("mouseleave", function () {
        this.style.filter = "";
      });
    });
  });
}

// Scroll Progress Indicator
function setupScrollProgress() {
  // Create progress bar
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #FF4500, #FFD700);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(progressBar);

  // Update progress on scroll
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = scrollPercent + "%";
  });
}

// Tamil Language Toggle (Fun Feature)
function setupLanguageToggle() {
  const tamilPhrases = {
    Home: "வீடு",
    Menu: "மெனு",
    Contact: "தொடர்பு",
    Book: "முன்பதிவு",
    Welcome: "வரவேற்கிறோம்",
    Tamil: "தமிழ்",
  };

  // Add language toggle button
  const langToggle = document.createElement("button");
  langToggle.innerHTML = "தமிழ்";
  langToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(45deg, #FF4500, #FFD700);
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 50px;
        font-weight: bold;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

  langToggle.addEventListener("click", function () {
    this.style.transform = "scale(1.1)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 200);

    // Toggle language (visual effect only)
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach((link) => {
      const currentText = link.textContent.trim();
      if (currentText.includes("(") && currentText.includes(")")) {
        // Extract English part
        const englishPart = currentText.split("(")[1].split(")")[0];
        link.textContent = englishPart;
      }
    });
  });

  document.body.appendChild(langToggle);
}

// Easter Egg Features
function setupEasterEggs() {
  // Konami Code Easter Egg
  let konamiCode = "";
  const konamiSequence =
    "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA";

  document.addEventListener("keydown", function (e) {
    konamiCode += e.code;

    if (konamiCode === konamiSequence) {
      activateEasterEgg();
      konamiCode = "";
    } else if (!konamiSequence.startsWith(konamiCode)) {
      konamiCode = "";
    }
  });

  // Click counter easter egg
  let clickCount = 0;
  document.querySelector(".logo").addEventListener("click", function (e) {
    e.preventDefault();
    clickCount++;

    if (clickCount === 10) {
      showSecretMessage();
      clickCount = 0;
    }
  });
}

// Activate Easter Egg
function activateEasterEgg() {
  // Create tea rain effect
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      createFloatingTea();
    }, i * 100);
  }

  // Show special message
  const message = document.createElement("div");
  message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #FF4500, #FFD700);
        color: white;
        padding: 2rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        animation: bounceIn 1s ease;
        text-align: center;
    `;
  message.innerHTML = "🎉 You found the secret! <br>வாழ்த்துக்கள்! 🫖";

  document.body.appendChild(message);

  setTimeout(() => {
    document.body.removeChild(message);
  }, 3000);
}

// Show secret message
function showSecretMessage() {
  alert(
    "🫖 Secret Unlocked! You've discovered the hidden Tamil tea master! வணக்கம்! 🙏"
  );
}

// Performance Optimization
function optimizePerformance() {
  // Lazy load images
  const images = document.querySelectorAll("img");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });

  // Debounce scroll events
  let scrollTimeout;
  const originalScrollHandler = window.onscroll;

  window.onscroll = function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (originalScrollHandler) {
        originalScrollHandler();
      }
    }, 16); // ~60fps
  };
}

// Initialize advanced features when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  setupAdvancedFeatures();
  setupScrollProgress();
  setupLanguageToggle();
  setupEasterEggs();
  optimizePerformance();
});

// Accessibility Enhancements
function setupAccessibility() {
  // Add skip link
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Skip to main content";
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
    `;

  skipLink.addEventListener("focus", function () {
    this.style.top = "6px";
  });

  skipLink.addEventListener("blur", function () {
    this.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main content ID
  const heroSection = document.getElementById("home");
  if (heroSection) {
    heroSection.id = "main-content";
  }

  // Enhance keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  document.addEventListener("mousedown", function () {
    document.body.classList.remove("keyboard-navigation");
  });
}

// Initialize accessibility features
document.addEventListener("DOMContentLoaded", setupAccessibility);

// Error Handling
window.addEventListener("error", function (e) {
  console.error("BontaTea Café Error:", e.error);

  // Show user-friendly error message
  const errorToast = document.createElement("div");
  errorToast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #ff4444;
        color: white;
        padding: 1rem;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.5s ease;
    `;
  errorToast.textContent =
    "Oops! Something went wrong. Please refresh the page.";

  document.body.appendChild(errorToast);

  setTimeout(() => {
    if (errorToast.parentNode) {
      errorToast.parentNode.removeChild(errorToast);
    }
  }, 5000);
});

// Export functions for global access (if needed)
window.BontaTeaCafe = {
  createFloatingTea,
  showBookingSuccessAnimation,
  displayBookingConfirmation,
  validateBookingData,
};
