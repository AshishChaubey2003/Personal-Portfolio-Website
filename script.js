// JavaScript for interactive elements
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initSkillBars();
  initMobileMenu();
  initSmoothScrolling();
  initHeaderScroll();
  initProjectAnimations();
  initCertificateAnimations();
  initFormValidation();
  initTypewriterEffect();
  initBackToTop();
  initActiveNavHighlight();
});

// Skill Bars Animation with percentage display
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const skillLevel = bar.getAttribute("data-skill");
      bar.style.width = skillLevel + "%";

      // Add percentage display if not exists
      const parent = bar.parentElement;
      if (parent && !parent.querySelector(".skill-percentage")) {
        const percentage = document.createElement("span");
        percentage.className = "skill-percentage";
        percentage.textContent = skillLevel + "%";
        parent.appendChild(percentage);
      }
    });
  }

  // Intersection Observer for skill bars animation
  const skillsSection = document.getElementById("skills");
  if (skillsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(animateSkillBars, 300);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );
    observer.observe(skillsSection);
  }
}

// Mobile Menu Functionality
function initMobileMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  const header = document.getElementById("header");

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = navLinks.style.display === "flex";
      navLinks.style.display = isOpen ? "none" : "flex";

      // Toggle menu icon
      const menuIcon = mobileMenu.querySelector("i");
      if (menuIcon) {
        menuIcon.className = isOpen ? "fas fa-bars" : "fas fa-times";
      }

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? "auto" : "hidden";
    });

    // Close menu when clicking on links
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.style.display = "none";
        document.body.style.overflow = "auto";

        // Reset menu icon
        const menuIcon = mobileMenu.querySelector("i");
        if (menuIcon) {
          menuIcon.className = "fas fa-bars";
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (header && !header.contains(e.target) && window.innerWidth <= 768) {
        navLinks.style.display = "none";
        document.body.style.overflow = "auto";

        const menuIcon = mobileMenu.querySelector("i");
        if (menuIcon) {
          menuIcon.className = "fas fa-bars";
        }
      }
    });
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && navLinks) {
      navLinks.style.display = "flex";
      document.body.style.overflow = "auto";

      const menuIcon = mobileMenu?.querySelector("i");
      if (menuIcon) {
        menuIcon.className = "fas fa-bars";
      }
    } else if (window.innerWidth <= 768 && navLinks && navLinks.style.display !== "none") {
      navLinks.style.display = "none";
    }
  });
}

// Smooth Scrolling with offset for fixed header
function initSmoothScrolling() {
  const header = document.getElementById("header");
  const headerHeight = header ? header.offsetHeight : 80;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#" or empty
      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update URL without page jump
        history.pushState(null, null, href);
      }
    });
  });
}

// Header Scroll Effect with hide/show
function initHeaderScroll() {
  const header = document.getElementById("header");
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        const currentScrollY = window.scrollY;

        // Background and shadow effect
        if (currentScrollY > 100) {
          header.style.background = "rgba(255, 255, 255, 0.98)";
          header.style.backdropFilter = "blur(10px)";
          header.style.boxShadow = "var(--shadow-md)";
        } else {
          header.style.background = "rgba(255, 255, 255, 0.95)";
          header.style.backdropFilter = "blur(10px)";
          header.style.boxShadow = "var(--shadow-sm)";
        }

        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          header.style.transform = "translateY(-100%)";
        } else if (currentScrollY < lastScrollY || currentScrollY <= 200) {
          header.style.transform = "translateY(0)";
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Project Card Animations
function initProjectAnimations() {
  const projectCards = document.querySelectorAll(".project-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Set initial styles for animation
  projectCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
}

// Certificate Card Animations
function initCertificateAnimations() {
  const certificateCards = document.querySelectorAll(".certificate-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  certificateCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.15
    }s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
  });
}

// Form Validation
function initFormValidation() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      let isValid = true;
      const email = data.email;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        isValid = false;
        showNotification("Please enter a valid email address", "error");
      }

      if (!data.name || data.name.trim() === "") {
        isValid = false;
        showNotification("Please enter your name", "error");
      }

      if (!data.message || data.message.trim() === "") {
        isValid = false;
        showNotification("Please enter a message", "error");
      }

      if (isValid) {
        showNotification("Message sent successfully! I'll get back to you soon.", "success");
        this.reset();
      }
    });
  }
}

// Notification System
function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  const bgColor = type === "success" ? "#4ECDC4" : type === "error" ? "#FF6B6B" : "#2A4B7C";
  notification.style.background = bgColor;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Typewriter Effect
function initTypewriterEffect() {
  const heroSubtitle = document.querySelector(".hero-subtitle");

  if (heroSubtitle && !heroSubtitle.hasAttribute("data-typed")) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = "";
    heroSubtitle.setAttribute("data-typed", "true");

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroSubtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(typeWriter, 500);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      observer.observe(heroSection);
    }
  }
}

// Back to Top Button
function initBackToTop() {
  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      backToTop.style.opacity = "1";
      backToTop.style.visibility = "visible";
    } else {
      backToTop.style.opacity = "0";
      backToTop.style.visibility = "hidden";
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Active Navigation Link Highlight
function initActiveNavHighlight() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  function highlightActiveLink() {
    let current = "";
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href").substring(1);
      if (href === current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", highlightActiveLink);
  highlightActiveLink();
}

// Button loading state
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (this.href === "#" || !this.href || this.getAttribute("href") === "#") {
      e.preventDefault();

      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
      this.disabled = true;

      setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
      }, 2000);
    }
  });
});
