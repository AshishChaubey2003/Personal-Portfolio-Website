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

      // Add percentage display
      const parent = bar.parentElement;
      if (parent && !parent.querySelector(".skill-percentage")) {
        const percentage = document.createElement("span");
        percentage.className = "skill-percentage";
        percentage.textContent = skillLevel + "%";
        percentage.style.cssText = `
          position: absolute;
          right: 5px;
          top: -20px;
          font-size: 12px;
          font-weight: 600;
          color: var(--primary);
          opacity: 0;
          transition: opacity 0.3s ease;
        `;

        parent.style.position = "relative";
        parent.appendChild(percentage);

        // Show percentage on hover
        parent.addEventListener("mouseenter", function () {
          percentage.style.opacity = "1";
        });

        parent.addEventListener("mouseleave", function () {
          percentage.style.opacity = "0";
        });
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

        // Hide/show header on scroll (optional)
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

// Form Validation (for future contact forms)
function initFormValidation() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Basic validation
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
        // Simulate form submission
        showNotification("Message sent successfully! I'll get back to you soon.", "success");
        this.reset();
      }
    });
  }
}

// Notification System
function showNotification(message, type = "info") {
  // Remove any existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 12px 20px;
    border-radius: var(--radius-lg);
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: var(--shadow-lg);
    max-width: 350px;
  `;

  // Set background color based on type
  const bgColor =
    type === "success" ? "#4ECDC4" : type === "error" ? "#FF6B6B" : "#2A4B7C";
  notification.style.background = bgColor;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Typewriter Effect for Hero Section
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

    // Start typing when hero section is in view
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
  // Create back to top button
  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 45px;
    height: 45px;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: var(--shadow-md);
    font-size: 18px;
  `;
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

// Add CSS for additional styles
const additionalStyles = document.createElement("style");
additionalStyles.textContent = `
  /* Active navigation link */
  .nav-links a.active {
    color: var(--primary);
  }
  
  .nav-links a.active::after {
    width: 100%;
  }
  
  /* Back to top button hover */
  .back-to-top:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
  
  /* Mobile menu improvements */
  @media (max-width: 768px) {
    .nav-links {
      position: fixed;
      top: 70px;
      left: 0;
      width: 100%;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      flex-direction: column;
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-lg);
      display: none;
      z-index: 999;
      max-height: calc(100vh - 70px);
      overflow-y: auto;
    }
    
    .nav-links li {
      margin: var(--spacing-sm) 0;
    }
    
    .nav-links a {
      display: block;
      padding: var(--spacing-sm);
      border-radius: var(--radius-md);
      transition: all var(--transition-normal);
    }
    
    .nav-links a:hover,
    .nav-links a.active {
      background: var(--light);
      color: var(--primary);
    }
    
    .nav-links a::after {
      display: none;
    }
  }
  
  /* Skill bar percentage */
  .skill-bar {
    position: relative;
  }
  
  /* Certificate card hover effect */
  .certificate-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  /* Project links styling */
  .project-links {
    display: flex;
    gap: var(--spacing-md);
    margin: var(--spacing-md) 0;
    flex-wrap: wrap;
  }
  
  .project-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--primary);
    text-decoration: none;
    font-size: var(--font-size-sm);
    font-weight: 500;
    transition: var(--transition-normal);
  }
  
  .project-link:hover {
    color: var(--secondary);
    transform: translateX(5px);
  }
  
  /* Notification styling */
  .notification {
    font-size: var(--font-size-sm);
  }
`;
document.head.appendChild(additionalStyles);
