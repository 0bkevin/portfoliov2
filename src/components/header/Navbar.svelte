<script>
  import { onMount } from "svelte";
  import NAV_ITEMS from "./NavbarData.ts";

  let Toggle = false;
  let activeNav = "#home";

  let stickyNav = false;

  const handleScroll = () => {
    const header = document.querySelector(".header");
    if (window.scrollY >= 50) {
      stickyNav = true;
    } else {
      stickyNav = false;
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
    x = link;
  };
</script>

<nav
  class={`h-16 flex justify-between items-center gap-4 p-6 max-w-6xl mx-auto transition-transform ${
    stickyNav ? "fixed-n" : ""
  }`}
>
  <a href="./" class="font-semibold text-lg ">Kevin Bravo</a>
  <div class={Toggle ? "nav__menu show-menu " : "nav__menu"}>
    <ul class="hidden md:flex gap-6">
      {#each NAV_ITEMS as { name, link, id, icon }}
        <li class="nav__item" key={id}>
          <a
            href={link}
            on:click={() => setActive(link)}
            class={activeNav === link ? "nav__link active-link hover:font-semibold" : "nav__link hover:font-semibold"}
          >
            <!-- <i class={`uil uil-${icon} nav__icon`}></i> -->
            {name}
          </a>
        </li>
      {/each}
    </ul>

    <!-- <button
      class="uil uil-times"
      on:click={toggleMenu}
      aria-label="Close menu"
      type="button"
    >
    </button>
  </div>
  <button class="" on:click={toggleMenu} aria-label="Toggle menu">
    <i class="uil uil-apps"></i>
  </button> -->
  </div>
</nav>
<style>
  .fixed-n {
    min-width: 100%;
    position: fixed;
    background-color: #fafafa;
    box-shadow: 0 -1px 4px rgba(0,0,0,0.15);
    top: 0;
    width: 100%;
    z-index: 1000;
  }
</style>