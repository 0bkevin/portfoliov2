<script>
  import { onMount } from "svelte";
  import NAV_ITEMS from "./NavbarData.ts";
  import ToggleDark from "../ToggleDark.svelte";

  export  let shouldFixed = true

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
  class={`bg-transparent h-16 flex justify-between items-center gap-4 p-6 max-w-6xl mx-auto transition-transform ease-in-out z-50 ${
    stickyNav  && shouldFixed ? "fixed-n drop-shadow-md !bg-[#fafafa] dark:!bg-[#13161d]" : " bg-transparent"
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
  .fixed-n {
    min-width: 100%;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
  }

</style>