/* =========================================================
   Portfolio logic — rendering, nav, filters, form, toast
   ========================================================= */
(function () {
  const DATA = window.PORTFOLIO;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // SVG icon library
  const ICONS = {
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    server:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
    brain:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2a2.5 2.5 0 0 1 2.5 2.5v15a2.5 2.5 0 0 1-5 0v-.54a2.5 2.5 0 0 1-1.5-4.3A2.5 2.5 0 0 1 5.5 8a2.5 2.5 0 0 1 0-4.5 2.5 2.5 0 0 1 4-1.5z"/><path d="M14.5 2a2.5 2.5 0 0 0-2.5 2.5v15a2.5 2.5 0 0 0 5 0v-.54a2.5 2.5 0 0 0 1.5-4.3A2.5 2.5 0 0 0 18.5 8a2.5 2.5 0 0 0 0-4.5 2.5 2.5 0 0 0-4-1.5z"/></svg>',
    palette:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    db: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    cloud:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
    github:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    external:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
    folder:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    grad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="i"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    award:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    checkCheck:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 8 22 12 18 16"/><polyline points="2 12 6 16 10 12"/><path d="M18 12h-8"/></svg>',
  };

  /* ============== 1. Set year, apply photo + links ============== */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Apply profile.photo if provided
  if (DATA.profile.photo) {
    const photoInner = $("#photoInner");
    if (photoInner) {
      photoInner.innerHTML = `<img src="${DATA.profile.photo}" alt="${DATA.profile.name}" />`;
    }
  }

  // Apply data-link hrefs
  $$("[data-link]").forEach((el) => {
    const k = el.getAttribute("data-link");
    if (DATA.profile.links[k]) {
      el.setAttribute("href", DATA.profile.links[k]);
      if (DATA.profile.links[k] !== "#" && el.tagName === "A") {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      }
    }
  });

  /* ============== 2. Navbar: scroll + mobile ============== */
  const navbar = $("#navbar");
  const onScroll = () => {
    if (window.scrollY > 20) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const menuBtn = $("#menuBtn");
  const navLinks = $("#navLinks");
  // Build mobile menu by cloning links
  const mobileMenu = document.createElement("div");
  mobileMenu.className = "mobile-menu";
  mobileMenu.innerHTML = navLinks.innerHTML;
  navbar.appendChild(mobileMenu);
  menuBtn.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    menuBtn.classList.toggle("open", open);
  });
  mobileMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mobileMenu.classList.remove("open");
      menuBtn.classList.remove("open");
    }
  });

  /* ============== 3. Render Skills ============== */
  const skillsGrid = $("#skillsGrid");
  skillsGrid.innerHTML = DATA.skills
    .map(
      (g) => `
    <div class="skill-card">
      <div class="skill-head">
        <div class="skill-head-icon">${ICONS[g.icon] || ICONS.code}</div>
        <h3>${g.category}</h3>
      </div>
      <div class="skill-tags">
        ${g.items.map((t) => `<span class="skill-tag">${t}</span>`).join("")}
      </div>
    </div>
  `,
    )
    .join("");

  /* ============== 4. Render Projects + filters ============== */
  const projectsGrid = $("#projectsGrid");
  const filterCount = $("#filterCount");

  const renderProjects = (filter = "All") => {
    const list = DATA.projects.filter(
      (p) => filter === "All" || (p.tags || []).includes(filter),
    );
    filterCount.textContent = `${list.length} / ${DATA.projects.length} projects`;

    if (list.length === 0) {
      projectsGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:64px 0;color:var(--dim);font-family:var(--font-mono);font-size:14px;">No projects match this filter.</div>`;
      return;
    }

    projectsGrid.innerHTML = list
      .map(
        (p, i) => `
      <article class="project-card ${p.accent} ${i === 0 && filter === "All" ? "featured" : ""}">
        <div class="p-head">
          <div class="p-title">
            <div class="p-icon p-accent">${ICONS.folder}</div>
            <div>
              <h3>${p.name}</h3>
              <span class="p-period">${p.period}</span>
            </div>
          </div>
          <div class="p-links">
            <a href="${p.links.code}" target="_blank" rel="noopener" aria-label="Source code">${ICONS.github}</a>
            <a href="${p.links.live}" target="_blank" rel="noopener" aria-label="Live demo">${ICONS.external}</a>
          </div>
        </div>
        <p class="p-subtitle p-accent">${p.subtitle}</p>
        <ul class="p-list">
          ${p.highlights.map((h) => `<li><span class="dot"></span><span>${h}</span></li>`).join("")}
        </ul>
        <div class="p-stack">
          ${p.stack.map((s) => `<span class="p-tag">${s}</span>`).join("")}
        </div>
        <a href="${p.links.code}" target="_blank" rel="noopener" class="p-cta p-accent">Explore project ↗</a>
      </article>
    `,
      )
      .join("");
  };
  renderProjects();

  const filtersEl = $("#filters");
  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    $$(".chip", filtersEl).forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });

  /* ============== 5. Render Education ============== */
  const eduEl = $("#eduTimeline");
  eduEl.innerHTML = DATA.education
    .map(
      (ed) => `
    <div class="tl-item">
      <div class="tl-dot">${ICONS.grad}</div>
      <div class="tl-card">
        <div class="tl-head">
          <div>
            <h3>${ed.school}</h3>
            <p class="tl-degree">${ed.degree}</p>
          </div>
          <span class="tl-period">${ed.period}</span>
        </div>
        <div class="tl-meta">
          <span>${ICONS.pin}${ed.location}</span>
          <span class="tl-score">${ed.score}</span>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  /* ============== 6. Render Certifications ============== */
  const certEl = $("#certGrid");
  certEl.innerHTML = DATA.certifications
    .map(
      (c) => `
    <div class="cert-card">
      <div class="cert-icon">${ICONS.award}</div>
      <div class="cert-body">
        <h3>${c.title}</h3>
        <div class="cert-meta">
          <span>${c.issuer}</span>
          <span style="color:var(--dimmer)">·</span>
          <span class="cert-year">${c.year}</span>
        </div>
      </div>
      <div class="cert-check">${ICONS.check}</div>
    </div>
  `,
    )
    .join("");

  /* ============== 7. Toast ============== */
  const toastEl = $("#toast");
  let toastTimer;
  const toast = (title, desc, variant = "") => {
    clearTimeout(toastTimer);
    toastEl.className = `toast ${variant}`;
    toastEl.innerHTML = `<div class="t-title">${title}</div>${desc ? `<div class="t-desc">${desc}</div>` : ""}`;
    requestAnimationFrame(() => toastEl.classList.add("show"));
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3200);
  };

  /* ============== 8. Copy email ============== */
  const copyBtn = $("#copyEmail");
  const copyIcon = $("#copyEmailIcon");
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(DATA.profile.email);
      copyIcon.innerHTML = ICONS.checkCheck;
      copyIcon.classList.add("copied");
      toast("Email copied", DATA.profile.email, "success");
      setTimeout(() => {
        copyIcon.classList.remove("copied");
        copyIcon.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
      }, 1800);
    } catch {
      toast("Copy failed", "Try selecting the text manually.", "error");
    }
  });

  /* ============== 9. Contact form ============== */
  const form = $("#contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#name", form).value.trim();
    const email = $("#email", form).value.trim();
    const message = $("#message", form).value.trim();

    if (!name || !email || !message) {
      return toast(
        "Missing fields",
        "Please fill in your name, email and message.",
        "error",
      );
    }
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!emailOk) {
      return toast(
        "Invalid email",
        "Please enter a valid email address.",
        "error",
      );
    }

    // Save to localStorage (frontend-only — replace with backend POST when ready)
    try {
      const list = JSON.parse(
        localStorage.getItem("portfolio_messages") || "[]",
      );
      list.push({ name, email, message, ts: new Date().toISOString() });
      localStorage.setItem("portfolio_messages", JSON.stringify(list));
    } catch {}

    const btn = form.querySelector("button[type=submit]");
    const origHtml = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = "Sending...";
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = origHtml;
      form.reset();
      toast(
        "Message sent ✓",
        "Thanks for reaching out — I'll reply within 24 hours.",
        "success",
      );
    }, 700);
  });

  /* ============== 10. Smooth reveal on scroll (optional nicety) ============== */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.style.opacity = 1;
          en.target.style.transform = "translateY(0)";
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.08 },
  );

  $$(".section, .hero-text, .hero-photo").forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(12px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    io.observe(el);
  });
})();
