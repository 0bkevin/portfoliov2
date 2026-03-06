<script>
  import { onMount } from "svelte";
  import NAV_ITEMS from "./NavbarData.ts";
  import ToggleDark from "../ToggleDark.svelte";

  export let shouldFixed = true;

  let activeNav = "#home";
  let stickyNav = false;
  let isAnimating = false;
  let lastScrollY = 0;
  let isHidden = false;

  const SCROLL_THRESHOLD = 200;
  const ANIMATION_DURATION_STICKY = 500;
  const ANIMATION_DURATION_NORMAL = 480;
  const ANIMATION_DURATION_HIDE_SHOW = 300;

  let ticking = false;

  const updateStickyState = (currentScrollY, crossedThreshold) => {
    if (crossedThreshold && !stickyNav) {
      stickyNav = true;
      isHidden = false;
      isAnimating = true;
      setTimeout(() => { isAnimating = false; }, ANIMATION_DURATION_STICKY);
    } else if (!crossedThreshold && stickyNav) {
      stickyNav = false;
      isHidden = false;
      isAnimating = true;
      setTimeout(() => { isAnimating = false; }, ANIMATION_DURATION_NORMAL);
    }
  };

  const updateVisibility = (scrollingDown, scrollingUp) => {
    if (scrollingDown && !isHidden) {
      isHidden = true;
      isAnimating = true;
      setTimeout(() => { isAnimating = false; }, ANIMATION_DURATION_HIDE_SHOW);
    } else if (scrollingUp && isHidden) {
      isHidden = false;
      isAnimating = true;
      setTimeout(() => { isAnimating = false; }, ANIMATION_DURATION_HIDE_SHOW);
    }
  };

  const handleScroll = () => {
    if (ticking) return;
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const crossedThreshold = currentScrollY >= SCROLL_THRESHOLD;
      const scrollingDown = currentScrollY > lastScrollY;
      const scrollingUp = currentScrollY < lastScrollY;
      updateStickyState(currentScrollY, crossedThreshold);
      if (stickyNav) {
        updateVisibility(scrollingDown, scrollingUp);
      }
      lastScrollY = currentScrollY;
      ticking = false;
    });
    ticking = true;
  };

  onMount(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const setActive = (link) => { activeNav = link; };

  $: navClasses = (() => {
    const base = "nav-bar";
    if (stickyNav && shouldFixed) {
      let c = "sticky-nav";
      if (isAnimating) c += " animating";
      if (isHidden) c += " hidden";
      return `${base} ${c}`;
    } else {
      let c = "nav-normal";
      if (isAnimating) c += " animating-out";
      return `${base} ${c}`;
    }
  })();
</script>

{#if stickyNav || isAnimating}
  <div aria-hidden="true" class="nav-spacer is-active"></div>
{:else}
  <div aria-hidden="true" class="nav-spacer"></div>
{/if}

<nav aria-label="Main navigation" aria-hidden={isHidden} class={navClasses}>
  <a href="/" class="nav-logo">KB</a>
  <div class="nav__menu">
    <ul class="nav-links">
      {#each NAV_ITEMS as item (item.id)}
        <li>
          <a
            href={item.link}
            on:click={() => setActive(item.link)}
            aria-current={activeNav === item.link ? 'page' : undefined}
            class="nav__link {activeNav === item.link ? 'active' : ''}"
          >
            {item.name}
          </a>
        </li>
      {/each}
      <li class="ml-1">
        <ToggleDark/>
      </li>
    </ul>
  </div>
</nav>

<style>
  .nav-spacer {
    height: 0;
    transition: height 480ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .nav-spacer.is-active {
    height: 3.5rem;
  }

  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3.5rem;
    padding: 0 1.5rem;
    max-width: 64rem;
    margin: 0 auto;
    z-index: 50;
  }

  .nav-normal {
    background: transparent;
    opacity: 1;
    will-change: transform, opacity;
    transition: background-color 400ms ease, opacity 400ms ease;
  }

  .nav-normal.animating-out {
    position: fixed;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    width: min(calc(100% - 2rem), 64rem);
    background: rgba(250, 250, 250, 0.82);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 100px;
    animation: slideOut 480ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sticky-nav {
    position: fixed;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    width: min(calc(100% - 2rem), 64rem);
    background: rgba(250, 250, 250, 0.82);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 100px;
    will-change: transform, box-shadow;
    transition: box-shadow 300ms ease,
                border-color 300ms ease,
                opacity 400ms ease,
                transform 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sticky-nav.hidden {
    transform: translateX(-50%) translateY(calc(-100% - 24px));
    transition-duration: 300ms;
  }

  .sticky-nav.animating {
    animation: slideIn 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  @keyframes slideOut {
    from { opacity: 1; background: rgba(250, 250, 250, 0.82); border-color: rgba(0, 0, 0, 0.06); }
    to { opacity: 0; background: transparent; border-color: transparent; }
  }

  .sticky-nav:hover {
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  }

  /* Logo */
  .nav-logo {
    font-weight: 700;
    font-size: 0.8125rem;
    letter-spacing: -0.02em;
    color: inherit;
    text-decoration: none;
    padding: 0.25rem 0.625rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    transition: border-color 200ms ease;
  }
  .nav-logo:hover {
    border-color: rgba(0, 0, 0, 0.3);
  }

  /* Links */
  .nav-links {
    display: none;
    align-items: center;
    gap: 0.125rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  @media (min-width: 768px) {
    .nav-links { display: flex; }
  }

  .nav__link {
    font-size: 0.8125rem;
    font-weight: 500;
    color: inherit;
    text-decoration: none;
    padding: 0.375rem 0.75rem;
    border-radius: 6px;
    opacity: 0.5;
    transition: opacity 200ms ease, background-color 200ms ease;
  }
  .nav__link:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.04);
  }
  .nav__link.active {
    opacity: 1;
    font-weight: 600;
    color: #d97706;
  }
  :global(.dark) .nav__link.active {
    color: #fbbf24;
  }

  /* Dark mode */
  :global(.dark) .sticky-nav {
    background: rgba(10, 10, 10, 0.82);
    border-color: rgba(255, 255, 255, 0.08);
  }
  :global(.dark) .nav-normal.animating-out {
    background: rgba(10, 10, 10, 0.82);
    border-color: rgba(255, 255, 255, 0.08);
    animation: slideOutDark 480ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  @keyframes slideOutDark {
    from { opacity: 1; background: rgba(10, 10, 10, 0.82); border-color: rgba(255, 255, 255, 0.08); }
    to { opacity: 0; background: transparent; border-color: transparent; }
  }
  :global(.dark) .sticky-nav:hover {
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
    border-color: rgba(255, 255, 255, 0.12);
  }
  :global(.dark) .sticky-nav.animating {
    animation: slideInDark 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  @keyframes slideInDark {
    from { opacity: 0; transform: translateX(-50%) translateY(-20px); border-color: transparent; }
    to { opacity: 1; transform: translateX(-50%) translateY(0); border-color: rgba(255, 255, 255, 0.08); }
  }
  :global(.dark) .nav-logo {
    border-color: rgba(255, 255, 255, 0.12);
  }
  :global(.dark) .nav-logo:hover {
    border-color: rgba(255, 255, 255, 0.3);
  }
  :global(.dark) .nav__link:hover {
    background-color: rgba(255, 255, 255, 0.06);
  }

  /* Mobile */
  @media (max-width: 768px) {
    .sticky-nav {
      left: 0;
      right: 0;
      transform: none;
      width: 100%;
      border-radius: 0;
      top: 0;
    }
    .sticky-nav.hidden {
      transform: translateY(-100%);
    }
    .sticky-nav:hover {
      transform: none;
    }
    .sticky-nav.hidden:hover {
      transform: translateY(-100%);
    }
    .nav-normal.animating-out {
      left: 0; right: 0;
      transform: none;
      width: 100%;
      border-radius: 0;
      top: 0;
    }
    .nav-spacer.is-active {
      height: 3.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-normal, .sticky-nav, .nav-logo, .nav__link {
      animation: none !important;
      transition-duration: 0.01ms !important;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .sticky-nav {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: rgba(250, 250, 250, 0.96);
    }
    :global(.dark) .sticky-nav {
      background: rgba(10, 10, 10, 0.96);
    }
  }
</style>
