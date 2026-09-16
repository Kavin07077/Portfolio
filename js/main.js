/**
 * KAVIN N Portfolio - Futuristic Cyber Experience
 * Inspired by Awwwards / JAI NITHIL R Portfolio Theme
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const root = document.documentElement;
  const loader = document.getElementById("loader");
  const progressBar = document.getElementById("scrollProgress");
  const themeToggle = document.getElementById("themeToggle");
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  const typingName = document.getElementById("typingName");
  const revealEls = document.querySelectorAll(".reveal");
  const parallaxEls = document.querySelectorAll(".parallax");
  const tiltCards = document.querySelectorAll(".tilt-card");
  const magnetics = document.querySelectorAll(".magnetic");
  const countEls = document.querySelectorAll(".count-val");
  const navLinks = document.querySelectorAll(".site-nav a[href^='#']");
  const sections = document.querySelectorAll("main section[id]");
  const backToTopBtn = document.getElementById("backToTop");

  /* ==========================================================================
     1. LOADER SCREEN
     ========================================================================== */
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loader) loader.classList.add("hidden");
    }, 450);
  });
  // Fallback in case load already fired
  setTimeout(() => {
    if (loader) loader.classList.add("hidden");
  }, 900);

  /* ==========================================================================
     2. THEME SWITCHER (Dark / Light)
     ========================================================================== */
  const savedTheme = localStorage.getItem("portfolioTheme");
  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
  } else {
    root.setAttribute("data-theme", "dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", nextTheme);
      localStorage.setItem("portfolioTheme", nextTheme);
    });
  }

  /* ==========================================================================
     3. TOP SCROLL PROGRESS & BACK TO TOP
     ========================================================================== */
  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const width = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
    if (progressBar) progressBar.style.width = `${width}%`;

    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  };

  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ==========================================================================
     4. TYPING NAME EFFECT (HERO)
     ========================================================================== */
  const startTypewriter = () => {
    if (!typingName) return;

    const phrases = ["KAVIN N", "SOFTWARE DEVELOPER", "TECH COMMUNITY"];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const current = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        typingName.textContent = current.slice(0, charIndex);
        if (charIndex >= current.length) {
          deleting = true;
          setTimeout(tick, 2200);
          return;
        }
        setTimeout(tick, 100);
      } else {
        charIndex--;
        typingName.textContent = current.slice(0, charIndex);
        if (charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, 50);
      }
    };

    setTimeout(tick, 600);
  };

  startTypewriter();

  /* ==========================================================================
     5. MOBILE NAVIGATION TOGGLE
     ========================================================================== */
  const setNavState = (isOpen) => {
    if (!navToggle || !siteNav) return;
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    siteNav.classList.toggle("open", isOpen);
  };

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const shouldOpen = !siteNav.classList.contains("open");
      setNavState(shouldOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => setNavState(false));
    });

    document.addEventListener("click", (e) => {
      if (!siteNav.classList.contains("open")) return;
      if (siteNav.contains(e.target) || navToggle.contains(e.target)) return;
      setNavState(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setNavState(false);
    });
  }

  /* ==========================================================================
     6. SCROLL REVEAL & SCROLL-SPY ACTIVE NAV
     ========================================================================== */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const matched = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("active", matched);
        });
      });
    },
    { rootMargin: "-30% 0px -40% 0px", threshold: 0.05 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  /* ==========================================================================
     7. ANIMATED NUMBER COUNTERS
     ========================================================================== */
  const animateCount = (el) => {
    const isDecimal = el.dataset.isDecimal === "true";
    const target = parseFloat(el.dataset.target || "0");
    if (!target || el.dataset.animated === "true") return;

    const duration = 1400;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = ease * target;

      if (isDecimal) {
        el.textContent = current.toFixed(2);
      } else {
        el.textContent = Math.floor(current) + (el.dataset.target.includes("+") ? "+" : el.dataset.target.includes("%") ? "%" : "");
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = isDecimal ? target.toFixed(2) : el.getAttribute("data-target");
        el.dataset.animated = "true";
      }
    };

    requestAnimationFrame(step);
  };

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  countEls.forEach((el) => countObserver.observe(el));

  /* ==========================================================================
     8. CUSTOM CURSOR
     ========================================================================== */
  const pointerFine = window.matchMedia("(pointer:fine)").matches;
  if (pointerFine && cursorDot && cursorRing) {
    let ringX = 0;
    let ringY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorDot.style.opacity = "1";
      cursorRing.style.opacity = "1";
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    document.querySelectorAll("a, button, input, textarea, .tilt-card, .filter-btn").forEach((el) => {
      el.addEventListener("mouseenter", () => cursorRing.classList.add("active"));
      el.addEventListener("mouseleave", () => cursorRing.classList.remove("active"));
    });

    requestAnimationFrame(animateCursor);
  }

  /* ==========================================================================
     9. 3D CARD TILT EFFECT
     ========================================================================== */
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotateY = ((x - midX) / midX) * 7;
      const rotateX = -((y - midY) / midY) * 7;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    });
  });

  /* ==========================================================================
     10. MAGNETIC BUTTON EFFECT
     ========================================================================== */
  magnetics.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0)";
    });
  });

  /* ==========================================================================
     11. PARALLAX EFFECT
     ========================================================================== */
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = Number(el.dataset.speed || 0.06);
        el.style.transform = `translateY(${y * speed}px)`;
      });
    },
    { passive: true }
  );

  /* ==========================================================================
     12. PROJECT FILTER TABS
     ========================================================================== */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.dataset.filter || "all";

      projectCards.forEach((card) => {
        const cat = card.dataset.category || "web";
        if (filterValue === "all" || cat === filterValue) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(16px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 250);
        }
      });
    });
  });

  /* ==========================================================================
     13. RESUME MODAL
     ========================================================================== */
  const resumeModal = document.getElementById("resumeModal");
  const openResumeModal = document.getElementById("openResumeModal");
  const heroResumeBtn = document.getElementById("heroResumeBtn");
  const closeResumeModal = document.getElementById("closeResumeModal");
  const dismissResumeModal = document.getElementById("dismissResumeModal");

  const openResume = () => {
    if (resumeModal) {
      resumeModal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  };

  const closeResume = () => {
    if (resumeModal) {
      resumeModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  };

  if (openResumeModal) openResumeModal.addEventListener("click", openResume);
  if (heroResumeBtn) heroResumeBtn.addEventListener("click", openResume);
  if (closeResumeModal) closeResumeModal.addEventListener("click", closeResume);
  if (dismissResumeModal) dismissResumeModal.addEventListener("click", closeResume);

  if (resumeModal) {
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeResume();
  });

  /* ==========================================================================
     14. CONTACT FORM & TOAST
     ========================================================================== */
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const toastFeedback = document.getElementById("toastFeedback");
  const toastTitle = document.getElementById("toastTitle");
  const toastMsg = document.getElementById("toastMsg");
  let toastTimer = null;

  const showToast = (title, message, isError = false) => {
    if (!toastFeedback) return;
    if (toastTitle) toastTitle.textContent = title;
    if (toastMsg) toastMsg.textContent = message;

    toastFeedback.style.borderColor = isError ? "#ef4444" : "var(--accent)";
    toastFeedback.classList.add("show");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastFeedback.classList.remove("show");
    }, 4500);
  };

  if (contactForm && submitBtn) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const subject = document.getElementById("subject")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      if (!name || !email || !subject || !message) {
        showToast("Missing Fields", "Please fill in all the contact form fields.", true);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast("Invalid Email", "Please enter a valid email address.", true);
        return;
      }

      submitBtn.classList.add("btn-loading");
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove("btn-loading");
        submitBtn.disabled = false;
        contactForm.reset();
        showToast("Message Sent!", "Thank you for reaching out to Kavin N. I will respond within 24 hours.");
      }, 1100);
    });
  }

  /* ==========================================================================
     15. INTERACTIVE FLOATING PARTICLE CANVAS
     ========================================================================== */
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  const particles = [];

  const resizeCanvas = () => {
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const createParticles = (count = 65) => {
    particles.length = 0;
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        a: Math.random() * 0.45 + 0.15,
      });
    }
  };

  const drawParticles = () => {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = window.innerWidth + 10;
      if (p.x > window.innerWidth + 10) p.x = -10;
      if (p.y < -10) p.y = window.innerHeight + 10;
      if (p.y > window.innerHeight + 10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100, 198, 255, ${p.a})`;
      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  };

  if (canvas && ctx) {
    resizeCanvas();
    createParticles();
    drawParticles();
    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });
  }
});
