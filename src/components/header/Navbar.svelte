<script>
  import { onMount } from "svelte";
  import NAV_ITEMS from "./NavbarData.ts";
  import ToggleDark from "../ToggleDark.svelte";

  export let shouldFixed = true;

  let activeNav = "#home";

  let stickyNav = false;
  let isAnimating = false;
  let lastScrollY = 0;

  // Throttle scroll events for better performance
  let ticking = false;

  const handleScroll = () => {
    if (ticking) return;

    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const crossedThreshold = currentScrollY >= 40;

      if (crossedThreshold && !stickyNav) {
        isAnimating = true;
        stickyNav = true;
        setTimeout(() => {
          isAnimating = false;
        }, 500);
      } else if (!crossedThreshold && stickyNav) {
        isAnimating = true;
        stickyNav = false;
        setTimeout(() => {
          isAnimating = false;
        }, 480);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    });

    ticking = true;
  };

  onMount(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const setActive = (link) => {
    activeNav = link;
  };
</script>

{#if stickyNav || isAnimating}
  <div aria-hidden="true" class="nav-spacer is-active"></div>
{:else}
  <div aria-hidden="true" class="nav-spacer"></div>
{/if}

<nav
  aria-label="Main navigation"
  class={`bg-transparent h-16 flex justify-between items-center gap-4 p-6 max-w-6xl mx-auto z-50 ${
    stickyNav && shouldFixed
      ? `sticky-nav drop-shadow-md${isAnimating ? ' animating' : ''}`
      : `nav-normal${isAnimating ? ' animating-out' : ''}`
  }`}
>
  <a href="/" class="nav-logo font-semibold text-lg">Kevin Bravo</a>
  <div class="nav__menu">
    <ul class="hidden md:flex gap-6 items-center">
      {#each NAV_ITEMS as item, index (item.id)}
        <li class="nav__item">
          <a
            href={item.link}
            on:click={() => setActive(item.link)}
            aria-current={activeNav === item.link ? 'page' : undefined}
            class={activeNav === item.link ? "nav__link active-link" : "nav__link"}
          >
            <span class="nav__link-text">{item.name}</span>
            <span class="nav__link-underline"></span>
          </a>
        </li>
      {/each}
      <li class="nav__item">
        <ToggleDark/>
      </li>
    </ul>

  </div>
</nav>
<style>
  /* Reserve space to prevent layout shift when nav becomes fixed */
  .nav-spacer {
    height: 0;
    transition: height 480ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-spacer.is-active {
    height: 4rem; /* match h-16 */
  }

  /* Normal state with transition readiness */
  .nav-normal {
    background: transparent;
    opacity: 1;
    transform: scale(1);
    will-change: transform, opacity;
    transition: background-color 400ms cubic-bezier(0.4, 0, 0.2, 1),
                opacity 400ms cubic-bezier(0.4, 0, 0.2, 1),
                transform 450ms cubic-bezier(0.34, 1.2, 0.64, 1);
  }

  /* Exit animation when transitioning back to normal */
  /* Keep fixed overlay during out animation to avoid layout jank */
  .nav-normal.animating-out {
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    z-index: 1000;
    width: min(100%, 72rem);
    min-width: 0;
    background: rgba(250, 250, 250, 0.7);
    -webkit-backdrop-filter: blur(16px) saturate(160%);
    backdrop-filter: blur(16px) saturate(160%);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 50px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    will-change: transform, opacity, border-color, background-color;
    animation: slideOutNav 480ms cubic-bezier(0.34, 1.2, 0.64, 1);
  }

  /* Enhanced sticky glassmorphism nav style */
  .sticky-nav {
    position: fixed;
    top: 16px;
    left: 0;
    right: 0;
    transform: translateY(0);
    z-index: 1000;
    width: min(100%, 72rem);
    min-width: 0;
    background: rgba(250, 250, 250, 0.7);
    -webkit-backdrop-filter: blur(16px) saturate(160%);
    backdrop-filter: blur(16px) saturate(160%);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 50px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    will-change: transform, box-shadow, border-color;
    transition: background-color 400ms cubic-bezier(0.4, 0, 0.2, 1),
                backdrop-filter 400ms cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1),
                border-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
                opacity 400ms cubic-bezier(0.4, 0, 0.2, 1),
                transform 500ms cubic-bezier(0.34, 1.35, 0.64, 1);
  }

  /* Apply animation only when entering sticky state */
  .sticky-nav.animating {
    animation: slideInNav 500ms cubic-bezier(0.34, 1.35, 0.64, 1);
  }

  @keyframes slideInNav {
    0% {
      opacity: 0;
      transform: translateY(-24px);
      border-color: rgba(0, 0, 0, 0);
    }
    60% {
      opacity: 1;
      transform: translateY(2px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      border-color: rgba(0, 0, 0, 0.08);
    }
  }

  @keyframes slideOutNav {
    0% {
      opacity: 1;
      transform: translateY(-2px);
      background: rgba(250, 250, 250, 0.7);
      border-color: rgba(0, 0, 0, 0.08);
    }
    60% {
      opacity: 1;
      transform: translateY(-1px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      background: transparent;
      border-color: rgba(0, 0, 0, 0);
    }
  }

  @keyframes slideOutNavDark {
    0% {
      opacity: 1;
      transform: translateY(-2px);
      background: rgba(19, 22, 29, 0.65);
      border-color: rgba(255, 255, 255, 0.12);
    }
    60% {
      opacity: 1;
      transform: translateY(-1px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      background: transparent;
      border-color: rgba(255, 255, 255, 0);
    }
  }

  /* Hover effect for extra interactivity */
  .sticky-nav:hover {
    box-shadow: 0 12px 32px rgba(2, 6, 23, 0.14);
    border-color: rgba(0, 0, 0, 0.14);
    transform: translateY(0);
  }

  /* Logo styling with hover effect */
  .nav-logo {
    position: relative;
    display: inline-block;
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1),
                color 200ms ease;
  }

  .nav-logo:hover {
    transform: translateY(-1px);
  }

  .nav-logo::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: currentColor;
    transition: width 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .nav-logo:hover::after {
    width: 100%;
  }


  /* Navigation links with enhanced microinteractions */
  .nav__link {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 0;
    color: inherit;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav__link-text {
    position: relative;
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1),
                font-weight 200ms ease;
  }

  .nav__link:hover .nav__link-text {
    transform: translateY(-2px);
    font-weight: 600;
  }

  /* Underline animation */
  .nav__link-underline {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
    transform: translateX(-50%);
    transition: width 400ms cubic-bezier(0.34, 1.56, 0.64, 1),
                opacity 250ms ease;
  }

  .nav__link:hover .nav__link-underline {
    width: 100%;
  }

  /* Active link state */
  .active-link {
    font-weight: 600;
  }

  .active-link .nav__link-underline {
    width: 100%;
    opacity: 1;
  }

  .active-link .nav__link-text {
    transform: translateY(-1px);
  }

  /* dark mode variant with improved border */
  :global(.dark) .sticky-nav {
    background: rgba(19, 22, 29, 0.65);
    border-color: rgba(255, 255, 255, 0.12);
  }
  /* Match out animation overlay in dark mode */
  :global(.dark) .nav-normal.animating-out {
    background: rgba(19, 22, 29, 0.65);
    border-color: rgba(255, 255, 255, 0.12);
    animation: slideOutNavDark 480ms cubic-bezier(0.34, 1.2, 0.64, 1);
  }

  :global(.dark) .sticky-nav:hover {
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  }

  /* Dark mode keyframes variant */
  :global(.dark) .sticky-nav.animating {
    animation: slideInNavDark 500ms cubic-bezier(0.34, 1.35, 0.64, 1);
  }

  @keyframes slideInNavDark {
    0% {
      opacity: 0;
      transform: translateY(-24px);
      border-color: rgba(255, 255, 255, 0);
    }
    60% {
      opacity: 1;
      transform: translateY(2px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      border-color: rgba(255, 255, 255, 0.12);
    }
  }

  /* subtle lift when scrolling past threshold */
  .drop-shadow-md {
    box-shadow: 0 8px 24px rgba(2, 6, 23, 0.1);
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
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      animation: slideInNavMobile 400ms cubic-bezier(0.4, 0, 0.2, 1);
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
    /* Keep overlay fixed during out animation on mobile */
    .nav-normal.animating-out {
      left: 0;
      right: 0;
      transform: none;
      width: 100%;
      border-radius: 0;
      top: 0;
      padding-left: 1.25rem;
      padding-right: 1.25rem;
    }

    .nav-spacer.is-active {
      height: 4rem;
    }
  }

  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .nav-normal,
    .sticky-nav,
    .nav-logo,
    .nav__link,
    .nav__link-text,
    .nav__link-underline,
    .nav__item {
      animation: none !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* reduce flicker on small widths */
  @media (prefers-reduced-transparency: reduce) {
    .sticky-nav {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: rgba(250, 250, 250, 0.95);
    }
    :global(.dark) .sticky-nav {
      background: rgba(19, 22, 29, 0.95);
    }
  }

</style>