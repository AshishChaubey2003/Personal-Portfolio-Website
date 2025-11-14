// JavaScript for interactive elements
document.addEventListener("DOMContentLoaded", function () {
  // Animate skill bars
  const skillBars = document.querySelectorAll(".skill-progress");

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const skillLevel = bar.getAttribute("data-skill");
      bar.style.width = skillLevel + "%";
    });
  }

  // Intersection Observer for skill bars animation
  const skillsSection = document.getElementById("skills");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  if (skillsSection) {
    observer.observe(skillsSection);
  }

  // Mobile menu toggle
  const mobileMenu = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenu) {
    mobileMenu.addEventListener("click", function () {
      navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
    });
  }

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

        // Close mobile menu if open
        if (window.innerWidth <= 768) {
          navLinks.style.display = "none";
        }
      }
    });
  });

  // Header background on scroll
  window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "var(--shadow-md)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "var(--shadow-sm)";
    }
  });
});
