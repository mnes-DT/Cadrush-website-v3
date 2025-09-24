function openDrawer() {
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("drawer-overlay");
  drawer.classList.remove("translate-x-full");
  drawer.classList.add("translate-x-0");
  overlay.classList.remove("hidden");
}

function closeDrawer() {
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("drawer-overlay");
  drawer.classList.remove("translate-x-0");
  drawer.classList.add("translate-x-full");
  overlay.classList.add("hidden");
  // Also close the services menu when closing the drawer
  const servicesMenu = document.getElementById("mobile-services-menu");
  const servicesArrow = document.getElementById("services-arrow");
  if (servicesMenu && servicesArrow) {
    servicesMenu.classList.add("hidden");
    servicesArrow.classList.remove("rotate-180");
  }
}

// Toggle mobile services dropdown
function toggleServicesMenu() {
  const servicesMenu = document.getElementById("mobile-services-menu");
  const servicesArrow = document.getElementById("services-arrow");

  if (servicesMenu && servicesArrow) {
    servicesMenu.classList.toggle("hidden");
    servicesArrow.classList.toggle("rotate-180");
  }
}

// Initialize mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  // Add click event listener to services toggle button
  const servicesToggle = document.getElementById("mobile-services-toggle");
  if (servicesToggle) {
    servicesToggle.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent event bubbling to parent elements
      toggleServicesMenu();
    });
  }

  // Highlight current mobile service link
  const currentPath = window.location.pathname;
  const serviceLinks = document.querySelectorAll("#mobile-services-menu a");

  serviceLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath) {
      link.classList.add("text-blue-800", "font-semibold");
      link.classList.remove("text-gray-600");
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    const servicesMenu = document.getElementById("mobile-services-menu");
    const servicesToggle = document.getElementById("mobile-services-toggle");

    if (
      servicesMenu &&
      !servicesMenu.contains(e.target) &&
      servicesToggle &&
      !servicesToggle.contains(e.target)
    ) {
      servicesMenu.classList.add("hidden");
      const servicesArrow = document.getElementById("services-arrow");
      if (servicesArrow) {
        servicesArrow.classList.remove("rotate-180");
      }
    }
  });
});

// Floating header scroll effect

document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("main-header");
  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll);
  onScroll(); // set initial state
});

// Floating Scroll-to-Top Button
const scrollBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollBtn.style.opacity = "1";
    scrollBtn.style.pointerEvents = "auto";
  } else {
    scrollBtn.style.opacity = "0";
    scrollBtn.style.pointerEvents = "none";
  }
});

// Progress bar animation
const steps = document.querySelectorAll(".step");
const progressLine = document.getElementById("progress-line");
let currentStep = 0;
let progressAnimated = false;

function fillStep() {
  if (currentStep < steps.length) {
    steps[currentStep].classList.remove("border-gray-300");
    steps[currentStep].classList.add("border-purple-500");

    // Update progress line width
    const width = (currentStep / (steps.length - 1)) * 100;
    progressLine.style.width = width + "%";

    currentStep++;
    setTimeout(fillStep, 1000); // Wait 1 second before filling the next step
  }
}

// Trigger animation when section is in view
const howWorksSection = document.querySelector("section:has(#progress-line)");
if (howWorksSection) {
  const observer = new window.IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !progressAnimated) {
          progressAnimated = true;
          fillStep();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(howWorksSection);
}

// Scroll-based scale-up effect for desktop video in index.html
document.addEventListener("DOMContentLoaded", function () {
  const drawerContact = document.querySelectorAll("#contactBtn-menu");
  const contactPopupMenu = document.getElementById("contactPopup");
  if (drawerContact) {
    drawerContact.forEach((drawerContact) => {
      drawerContact.addEventListener("click", function (e) {
        // alert("clicked")
        e.preventDefault();
        closeDrawer();
        contactPopupMenu.classList.remove("hidden");
        contactPopupMenu.classList.add("flex");
        document.body.style.overflow = "hidden";
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const contactBtn = document.getElementById("contactBtn");
  const contactPopup = document.getElementById("contactPopup");
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");
  const formFields = document.getElementById("formFields");
  const submitBtn = document.getElementById("submitBtn");
  const submitText = document.getElementById("submitText");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const closeButtons = document.querySelectorAll("#closeContact");

  // Toggle contact form
  if (contactBtn && contactPopup) {
    contactBtn.addEventListener("click", function () {
      contactPopup.classList.remove("hidden");
      contactPopup.classList.add("flex");
      document.body.style.overflow = "hidden";
    });
  }

  // Add click event to all close buttons
  closeButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      closeContactForm();
    });
  });

  // Close when clicking outside the form
  if (contactPopup) {
    contactPopup.addEventListener("click", function (e) {
      if (e.target === contactPopup) {
        closeContactForm();
      }
    });
  }

  function closeContactForm() {
    contactPopup.classList.add("hidden");
    contactPopup.classList.remove("flex");
    document.body.style.overflow = "";
    // Reset form when closing
    setTimeout(() => {
      contactForm.reset();
      successMessage.classList.add("hidden");
      errorMessage.classList.add("hidden");
      formFields.classList.remove("hidden");
      submitBtn.disabled = false;
      submitText.classList.remove("hidden");
      loadingSpinner.classList.add("hidden");
      // Clear error messages
      document.querySelectorAll('[id$="Error"]').forEach((el) => {
        el.classList.add("hidden");
        el.textContent = "";
      });
      // Clear error borders
      document.querySelectorAll("input").forEach((input) => {
        input.classList.remove("border-red-500");
      });
    }, 300);
  }

  // Form validation
  function validateForm() {
    let isValid = true;
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");

    // Reset errors
    [nameError, emailError, phoneError].forEach((el) => {
      el.classList.add("hidden");
      el.textContent = "";
    });
    [name, email, phone].forEach((input) => {
      input.classList.remove("border-red-500");
    });

    // Validate name
    if (!name.value.trim()) {
      name.classList.add("border-red-500");
      nameError.textContent = "Name is required";
      nameError.classList.remove("hidden");
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      email.classList.add("border-red-500");
      emailError.textContent = "Email is required";
      emailError.classList.remove("hidden");
      isValid = false;
    } else if (!emailRegex.test(email.value)) {
      email.classList.add("border-red-500");
      emailError.textContent = "Please enter a valid email address";
      emailError.classList.remove("hidden");
      isValid = false;
    }

    // Validate phone
    const phoneRegex = /^[0-9+\-\s()]{10,20}$/;
    if (!phone.value.trim()) {
      phone.classList.add("border-red-500");
      phoneError.textContent = "Contact number is required";
      phoneError.classList.remove("hidden");
      isValid = false;
    } else if (!phoneRegex.test(phone.value)) {
      phone.classList.add("border-red-500");
      phoneError.textContent = "Please enter a valid phone number";
      phoneError.classList.remove("hidden");
      isValid = false;
    }

    return isValid;
  }

  // Form submission
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitText.classList.add("hidden");
    loadingSpinner.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    try {
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
      };

      const response = await fetch("https://cadrush.com/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong. Please try again."
        );
      }

      // Show success message
      formFields.classList.add("hidden");
      successMessage.classList.remove("hidden");

      // Reset form after delay
      setTimeout(() => {
        closeContactForm();
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      errorMessage.textContent =
        error.message || "Failed to send message. Please try again later.";
      errorMessage.classList.remove("hidden");
      // Re-enable submit button
      submitBtn.disabled = false;
      submitText.classList.remove("hidden");
      loadingSpinner.classList.add("hidden");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const videoContainer = document.querySelector(".about-video-desktop");
  const videoBlock = videoContainer
    ? videoContainer.querySelector("video")
    : null;
  if (!videoBlock || !videoContainer) return;

  // Start small width (100px) and scale to 75% of parent
  videoContainer.style.width = "100px";
  let targetWidth = 100;
  let currentWidth = 100;
  let hasPlayed = false;
  const minW = 100;
  function getMaxW() {
    return Math.min(window.innerWidth * 0.75, 1200);
  }

  function ease(current, target, factor = 0.12) {
    return current + (target - current) * factor;
  }

  function handleScale() {
    const rect = videoContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const visible = Math.max(
      0,
      Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.8))
    );
    const maxW = getMaxW();
    targetWidth = minW + (maxW - minW) * visible;
  }

  function animateWidth() {
    currentWidth = ease(currentWidth, targetWidth);
    videoContainer.style.width = currentWidth + "px";
    // Autoplay when at least 50% of max width
    const maxW = getMaxW();
    if (!hasPlayed && currentWidth >= maxW * 0.5) {
      videoBlock.muted = true;
      videoBlock.play();
      hasPlayed = true;
    }
    if (Math.abs(currentWidth - targetWidth) > 0.5) {
      requestAnimationFrame(animateWidth);
    } else {
      videoContainer.style.width = targetWidth + "px";
    }
  }

  window.addEventListener("scroll", () => {
    handleScale();
    animateWidth();
  });
  window.addEventListener("resize", () => {
    handleScale();
    animateWidth();
  });
  handleScale();
  animateWidth();
});
