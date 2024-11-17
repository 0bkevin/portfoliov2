<script>
  import { onMount } from "svelte";
  import NAV_ITEMS from "./NavbarData.ts";
  import "./navbar.css";

  let Toggle = false;
  let activeNav = "#home";

  const handleScroll = () => {
    const header = document.querySelector(".header");
    if (window.scrollY >= 80) {
      header.classList.add("scroll-header");
    } else {
      header.classList.remove("scroll-header");
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

<nav class="h-[calc(var(--header-height)+1.5rem)] flex justify-between items-center gap-4 container">
  <a href="index.html" class="nav__logo">Kevin Bravo</a>
  <div class={Toggle ? "nav__menu show-menu" : "nav__menu"}>
    <ul class="nav__list">
      {#each NAV_ITEMS as { name, link, id, icon }}
        <li class="nav__item" key={id}>
          <a
            href={link}
            on:click={() => setActive(link)}
            class={activeNav === link ? "nav__link active-link" : "nav__link"}
          >
            <i class={`uil uil-${icon} nav__icon`}></i>
            {name}
          </a>
        </li>
      {/each}
    </ul>
    <i class="uil uil-times nav__close" on:click={toggleMenu}></i>
  </div>
  <div class="nav__toggle" on:click={toggleMenu}>
    <i class="uil uil-apps"></i>
  </div>
</nav>