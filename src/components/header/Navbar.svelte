<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import NAV_ITEMS from "./NavbarData.ts";
  import ToggleDark from "../ToggleDark.svelte";

  export let shouldFixed = true;

  let activeNav = "";
  let isMobileMenuOpen = false;

  const setActive = (link) => { activeNav = link; };
  const toggleMobileMenu = () => { isMobileMenuOpen = !isMobileMenuOpen; };

  onMount(() => {
    const updateActiveNav = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path.startsWith("/0b")) {
        activeNav = "/0b";
      } else if (path.startsWith("/me/ama")) {
        activeNav = "/me/ama";
      } else if (path.startsWith("/projects")) {
        activeNav = "/projects";
      } else if (path === "/" || path === "") {
        if (hash === "#contact") activeNav = "/#contact";
        else if (hash === "#projects") activeNav = "/#projects";
        else if (hash === "#experience") activeNav = "/#experience";
        else if (hash === "#blog") activeNav = "/0b";
        else if (hash === "#home" || hash === "") activeNav = "/#home";
      }
    };

    updateActiveNav();
    window.addEventListener("hashchange", updateActiveNav);

    // Setup intersection observer for homepage sections
    let observer;
    if (window.location.pathname === "/" || window.location.pathname === "") {
      const sections = document.querySelectorAll("section[id]");
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("id");
              if (id === "contact") activeNav = "/#contact";
              else if (id === "projects") activeNav = "/#projects";
              else if (id === "experience") activeNav = "/#experience";
              else if (id === "blog") activeNav = "/0b";
              else if (id === "home") activeNav = "/#home";
            }
          });
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );

      sections.forEach((section) => observer.observe(section));
    }

    return () => {
      window.removeEventListener("hashchange", updateActiveNav);
      if (observer) observer.disconnect();
    };
  });

  let y = 0;
  let lastY = 0;
  let isHidden = false;
  let isAtTop = true;

  $: {
    isAtTop = y < 20;
    if (shouldFixed) {
      if (y > lastY && y > 60) {
        isHidden = true;
        isMobileMenuOpen = false; // Close mobile menu on scroll down
      } else if (y < lastY) {
        isHidden = false;
      }
    }
    lastY = y;
  }
</script>

<svelte:window bind:scrollY={y} />


<div
  class="
    {shouldFixed ? 'fixed top-0 left-0 right-0 z-50 px-4 sm:px-6' : 'relative z-50'}
    transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none
    {isHidden && shouldFixed ? '-translate-y-[150%]' : (shouldFixed && !isAtTop ? 'translate-y-4' : 'translate-y-0')}
  "
>
  <nav aria-label="Main navigation" class="
    pointer-events-auto w-full max-w-5xl mx-auto flex items-center justify-between h-14 px-6
    transition-all duration-300 relative
    {(!isAtTop && shouldFixed) ? 'bg-[#fafafa]/70 dark:bg-[#0a0a0a]/70 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]' : 'bg-transparent'}
  ">
    <a href="/" class="font-bold text-[13px] tracking-[-0.02em] text-inherit no-underline px-2.5 py-1  rounded-md transition-colors duration-200 ease-in hover:border-black/30 dark:border-white/[0.12] dark:hover:border-white/30 motion-reduce:transition-none">KB</a>

    <!-- Desktop menu -->
    <div class="hidden md:block">
      <ul class="flex items-center gap-0.5 m-0 p-0 list-none">
        {#each NAV_ITEMS as item (item.id)}
          <li>
            <a
              href={item.link}
              on:click={() => setActive(item.link)}
              aria-current={activeNav === item.link ? 'page' : undefined}
              class="text-[13px] text-inherit no-underline px-3 py-1.5 rounded-md transition-all duration-200 ease-in motion-reduce:transition-none  {activeNav === item.link ? 'opacity-100 font-semibold text-amber-600 dark:text-amber-400' : 'font-medium opacity-50 hover:opacity-100'}"
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

    <!-- Mobile menu toggle & ToggleDark -->
    <div class="flex items-center gap-2 md:hidden">
      <ToggleDark/>
      <button
        on:click={toggleMobileMenu}
        aria-label="Toggle mobile menu"
        class="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/[0.06] transition-colors"
      >
        {#if !isMobileMenuOpen}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-70">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-70">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        {/if}
      </button>
    </div>
  </nav>

  <!-- Mobile Menu Dropdown -->
  {#if isMobileMenuOpen}
    <div
      transition:slide={{ duration: 250 }}
      class="md:hidden absolute top-[calc(100%+0.5rem)] left-0 right-0 max-w-5xl mx-auto px-4 sm:px-6 pointer-events-auto"
    >
      <div class="bg-[#fafafa]/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border border-black/10 dark:border-white/[0.12] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] p-2">
        <ul class="flex flex-col gap-1 m-0 p-0 list-none">
          {#each NAV_ITEMS as item (item.id)}
            <li>
              <a
                href={item.link}
                on:click={() => { setActive(item.link); isMobileMenuOpen = false; }}
                aria-current={activeNav === item.link ? 'page' : undefined}
                class="block text-[14px] text-inherit no-underline px-4 py-3 rounded-xl transition-all duration-200 ease-in hover:bg-black/5 dark:hover:bg-white/[0.06] {activeNav === item.link ? 'font-semibold text-amber-600 dark:text-amber-400 bg-black/5 dark:bg-white/[0.06]' : 'font-medium opacity-70 hover:opacity-100'}"
              >
                {item.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}
</div>
