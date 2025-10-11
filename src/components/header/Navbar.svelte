<script>
  import { onMount } from "svelte";
  import NAV_ITEMS from "./NavbarData.ts";
  import ToggleDark from "../ToggleDark.svelte";

  export  let shouldFixed = true

  let Toggle = false;
  let activeNav = "#home";

  let stickyNav = false;
  let isAnimating = false;

  const handleScroll = () => {
    const header = document.querySelector(".header");
    if (window.scrollY >= 50) {
      if (!stickyNav) {
        isAnimating = true;
        stickyNav = true;
        // Remove animation class after animation completes
        setTimeout(() => {
          isAnimating = false;
        }, 450);
      }
    } else {
      if (stickyNav) {
        isAnimating = true;
        stickyNav = false;
        // Remove animation class after animation completes
        setTimeout(() => {
          isAnimating = false;
        }, 450);
      }
    }
  };

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const toggleMenu = () => {
    Toggle = !Toggle;
  };

  const setActive = (link) => {
    activeNav = link;
  };
</script>

<nav
  class={`bg-transparent h-16 flex justify-between items-center gap-4 p-6 max-w-6xl mx-auto z-50 ${
    stickyNav && shouldFixed
      ? `sticky-nav drop-shadow-md${isAnimating ? ' animating' : ''}`
      : `nav-normal${isAnimating ? ' animating-out' : ''}`
  }`}
>
  <a href="/" class="font-semibold text-lg ">Kevin Bravo</a>
  <div class={Toggle ? "nav__menu show-menu " : "nav__menu"}>
    <ul class="hidden md:flex gap-6">
      {#each NAV_ITEMS as { name, link, id, icon }}
        <li class="nav__item" key={id}>
          <a
            href={link}
            on:click={() => setActive(link)}
            class={activeNav === link ? "nav__link active-link hover:font-semibold" : "nav__link hover:font-semibold"}
          >
            {name}
          </a>
        </li>
      {/each}
      <ToggleDark/>
    </ul>

  </div>
</nav>
<style>
  /* Normal state with transition readiness */
  .nav-normal {
    background: transparent;
    opacity: 1;
    transform: scale(1);
    transition: background-color 350ms cubic-bezier(0.4, 0, 0.2, 1),
                opacity 350ms cubic-bezier(0.4, 0, 0.2, 1),
                transform 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Exit animation when transitioning back to normal */
  .nav-normal.animating-out {
    animation: slideOutNav 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Enhanced sticky glassmorphism nav style */
  .sticky-nav {
    position: fixed;
    /* center the nav and give breathing room from the top */
    top: 16px;
    left: 50%;
    transform: translateX(-50%) scale(0.98);
    z-index: 1000;
    /* behave like max-w-6xl container but shrink on small screens */
    width: min(100%, 72rem);
    min-width: 0;
    background: rgba(250, 250, 250, 0.65); /* light glass */
    -webkit-backdrop-filter: blur(12px) saturate(140%);
    backdrop-filter: blur(12px) saturate(140%);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 50px;
    padding-left: 2rem;
    padding-right: 2rem;
    /* Smooth multi-property transition with separated border timing */
    transition: background-color 350ms cubic-bezier(0.4, 0, 0.2, 1),
                backdrop-filter 350ms cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 350ms cubic-bezier(0.4, 0, 0.2, 1),
                border-color 450ms cubic-bezier(0.4, 0, 0.2, 1),
                opacity 350ms cubic-bezier(0.4, 0, 0.2, 1),
                transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Apply animation only when entering sticky state */
  .sticky-nav.animating {
    animation: slideInNav 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes slideInNav {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px) scale(0.95);
      border-color: rgba(0, 0, 0, 0);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(0.98);
      border-color: rgba(0, 0, 0, 0.08);
    }
  }

  @keyframes slideOutNav {
    from {
      opacity: 1;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Hover effect for extra interactivity */
  .sticky-nav:hover {
    box-shadow: 0 8px 24px rgba(2,6,23,0.12);
    border-color: rgba(0, 0, 0, 0.12);
  }

  /* dark mode variant with improved border */
  :global(.dark) .sticky-nav {
    background: rgba(19, 22, 29, 0.6);
    border-color: rgba(255, 255, 255, 0.12);
  }

  :global(.dark) .sticky-nav:hover {
    border-color: rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  /* Dark mode keyframes variant */
  :global(.dark) .sticky-nav.animating {
    animation: slideInNavDark 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes slideInNavDark {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px) scale(0.95);
      border-color: rgba(255, 255, 255, 0);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(0.98);
      border-color: rgba(255, 255, 255, 0.12);
    }
  }

  /* subtle lift when scrolling past threshold */
  .drop-shadow-md {
    box-shadow: 0 8px 24px rgba(2,6,23,0.1);
  }

  /* On small screens behave like a normal full-width fixed header */
  @media (max-width: 768px) {
    .sticky-nav {
      left: 0;
      right: 0;
      transform: none;
      width: 100%;
      border-radius: 0;
      top: 0;
      padding-left: 1.25rem; /* align with original p-6 */
      padding-right: 1.25rem;
      animation: slideInNavMobile 350ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .sticky-nav:hover {
      transform: none;
    }

    @keyframes slideInNavMobile {
      from {
        opacity: 0;
        transform: translateY(-100%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  /* reduce flicker on small widths */
  @media (prefers-reduced-transparency: reduce) {
    .sticky-nav {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: rgba(250,250,250,0.95);
    }
    :global(.dark) .sticky-nav {
      background: rgba(19,22,29,0.95);
    }
  }

</style>