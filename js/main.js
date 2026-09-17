document.addEventListener("DOMContentLoaded", () => {

  /* ========================= [Dropdown] ========================= */
  /* Toggle the artifact nav dropdown open/closed */
  /* Closes on outside click, Escape key, or menu item click */

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
      if (!dropdown.contains(e.target)) {
        closeDropdown();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDropdown();
        toggle.focus();
      }
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeDropdown();
      });
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
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /* ========================= [Reveal Animations] ========================= */
  /* IntersectionObserver adds .visible class when elements enter viewport */
  /* Supports data-delay attribute for staggered reveals */

  const animatedElements = document.querySelectorAll(".reveal");

  if (animatedElements.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;

            setTimeout(() => {
              entry.target.classList.add("visible");
            }, Number(delay));

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    animatedElements.forEach((el) => {
      observer.observe(el);
    });
  } else {
    animatedElements.forEach((el) => {
      el.classList.add("visible");
    });
  }

  /* ========================= [Author Popover] ========================= */
  /* Hover-activated floating contact panel on author cards */
  /* Smart positioning: above by default, flips below if no space */
  /* Last card (Thijmen) right-aligns by default */
  /* Slow entrance (0.4s), fast exit (0.15s), 2.5s delay before hiding */

  const POPOVER_DELAY = 2500;
  const authorCards = document.querySelectorAll(".author-card");
  let popoverTimeout = null;
  let activeCard = null;

  function positionPopover(card) {
    const popover = card.querySelector(".author-popover");
    if (!popover) return;

    // Reset all inline styles and classes
    popover.classList.remove("popover-below");
    popover.style.removeProperty("top");
    popover.style.removeProperty("bottom");
    popover.style.removeProperty("left");
    popover.style.removeProperty("right");

    const rect = card.getBoundingClientRect();
    const popoverHeight = popover.offsetHeight || 120;
    const gap = 12;
    const spaceAbove = rect.top;

    // Not enough space above → flip below
    if (spaceAbove < popoverHeight + gap + 16) {
      popover.classList.add("popover-below");
    }

    // Last card (Thijmen): right-align by default
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

    card.addEventListener("mouseenter", () => {
      showPopover(card);
    });

    card.addEventListener("mouseleave", () => {
      hidePopover();
    });

    popover.addEventListener("mouseenter", () => {
      clearTimeout(popoverTimeout);
    });

    popover.addEventListener("mouseleave", () => {
      hidePopover();
    });
  });
});
