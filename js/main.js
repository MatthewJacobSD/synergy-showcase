document.addEventListener("DOMContentLoaded", () => {

  /* ========================= [Page Transition] ========================= */
  /* Fade in on load, fade out on internal link clicks */

  document.body.classList.add("page-loaded");

  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("http")) return;
    if (link.target === "_blank") return;

    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.add("page-leaving");
      setTimeout(() => {
        window.location.href = href;
      }, 250);
    });
  });

  /* ========================= [Dropdown] ========================= */
  /* Toggle the artifact nav dropdown open/closed */

  const dropdown = document.querySelector(".nav-dropdown");
  const toggle = dropdown?.querySelector(".nav-dropdown-toggle");
  const menu = dropdown?.querySelector(".nav-dropdown-menu");

  if (dropdown && toggle && menu) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen);
      if (isOpen) {
        const firstItem = menu.querySelector("a");
        firstItem?.focus();
      }
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) closeDropdown();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDropdown();
        toggle.focus();
      }
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeDropdown());
    });
  }

  function closeDropdown() {
    dropdown?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  }

  /* ========================= [Smooth Scroll] ========================= */
  /* Smooth scroll for anchor links (#id targets) */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ========================= [Reveal Animations] ========================= */
  /* IntersectionObserver adds .visible class when elements enter viewport */

  const animatedElements = document.querySelectorAll(".reveal");

  if (animatedElements.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => entry.target.classList.add("visible"), Number(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    animatedElements.forEach((el) => observer.observe(el));
  } else {
    animatedElements.forEach((el) => el.classList.add("visible"));
  }

  /* ========================= [Active Nav on Scroll] ========================= */
  /* Highlights the current section link in the nav */

  const navLinks = document.querySelectorAll('.primary-nav a[href^="#"]');
  const sections = [];

  navLinks.forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    const section = document.getElementById(id);
    if (section) sections.push({ id, el: section, link });
  });

  if (sections.length && "IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const match = sections.find((s) => s.el === entry.target);
          if (match) {
            if (entry.isIntersecting) {
              navLinks.forEach((l) => l.classList.remove("nav-active"));
              match.link.classList.add("nav-active");
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    );
    sections.forEach((s) => navObserver.observe(s.el));
  }

  /* ========================= [Author Popover] ========================= */
  /* Hover-activated floating contact panel on author cards */

  const POPOVER_DELAY = 2500;
  const authorCards = document.querySelectorAll(".author-card");
  let popoverTimeout = null;
  let activeCard = null;

  function positionPopover(card) {
    const popover = card.querySelector(".author-popover");
    if (!popover) return;

    popover.classList.remove("popover-below");
    popover.style.removeProperty("top");
    popover.style.removeProperty("bottom");
    popover.style.removeProperty("left");
    popover.style.removeProperty("right");

    const rect = card.getBoundingClientRect();
    const popoverHeight = popover.offsetHeight || 120;
    const gap = 12;
    const spaceAbove = rect.top;

    if (spaceAbove < popoverHeight + gap + 16) {
      popover.classList.add("popover-below");
    }

    const isLastCard = card === authorCards[authorCards.length - 1];
    const popoverWidth = popover.offsetWidth || 320;
    const spaceRight = window.innerWidth - rect.left;

    if (isLastCard || spaceRight < popoverWidth + 16) {
      popover.style.left = "auto";
      popover.style.right = "0";
    }
  }

  function showPopover(card) {
    clearTimeout(popoverTimeout);
    if (activeCard && activeCard !== card) {
      activeCard.classList.remove("popover-active");
    }
    card.classList.add("popover-active");
    activeCard = card;
    positionPopover(card);
  }

  function hidePopover() {
    popoverTimeout = setTimeout(() => {
      if (activeCard) {
        activeCard.classList.remove("popover-active");
        activeCard = null;
      }
    }, POPOVER_DELAY);
  }

  authorCards.forEach((card) => {
    const popover = card.querySelector(".author-popover");
    if (!popover) return;

    card.addEventListener("mouseenter", () => showPopover(card));
    card.addEventListener("mouseleave", () => hidePopover());
    popover.addEventListener("mouseenter", () => clearTimeout(popoverTimeout));
    popover.addEventListener("mouseleave", () => hidePopover());
  });

  /* ========================= [Verification checklist] ========================= */

  document.querySelectorAll(".verify-list button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pressed = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", pressed ? "false" : "true");
    });
  });

  /* ========================= [Custom Cursor on Artifact Links] ========================= */
  /* Shows a small "VIEW ↗" label next to cursor on artifact exhibit links (desktop only) */

  if (window.matchMedia("(min-width: 901px) and (hover: hover)").matches) {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.innerHTML = '<span>VIEW</span><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>';
    document.body.appendChild(cursor);

    let cursorVisible = false;

    document.querySelectorAll(".artifact-exhibit-link, .cta").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorVisible = true;
        cursor.classList.add("visible");
      });
      el.addEventListener("mouseleave", () => {
        cursorVisible = false;
        cursor.classList.remove("visible");
      });
    });

    document.addEventListener("mousemove", (e) => {
      if (cursorVisible) {
        cursor.style.left = e.clientX + 16 + "px";
        cursor.style.top = e.clientY + 16 + "px";
      }
    });
  }
});