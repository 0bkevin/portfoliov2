<script>
  import NAV_ITEMS from "./NavbarData.ts";
  import ToggleDark from "../ToggleDark.svelte";

  export let shouldFixed = true;

  let activeNav = "#home";

  const setActive = (link) => { activeNav = link; };

  let y = 0;
  let lastY = 0;
  let isHidden = false;
  let isAtTop = true;

  $: {
    isAtTop = y < 20;
    if (shouldFixed) {
      if (y > lastY && y > 60) {
        isHidden = true;
      } else if (y < lastY) {
        isHidden = false;
      }
    }
    lastY = y;
  }
</script>

<svelte:window bind:scrollY={y} />

{#if shouldFixed}
  <div aria-hidden="true" class="h-14"></div>
{/if}

<div 
  class="
    {shouldFixed ? 'fixed top-0 left-0 right-0 z-50 px-4 sm:px-6' : 'relative z-50'}
    transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none
    {isHidden && shouldFixed ? '-translate-y-[150%]' : (shouldFixed && !isAtTop ? 'translate-y-4' : 'translate-y-0')}
  "
>
  <nav aria-label="Main navigation" class="
    pointer-events-auto w-full max-w-5xl mx-auto flex items-center justify-between h-14 px-6
    transition-all duration-300
    {(!isAtTop && shouldFixed) ? 'bg-[#fafafa]/70 dark:bg-[#0a0a0a]/70 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]' : 'bg-transparent'}
  ">
    <a href="/" class="font-bold text-[13px] tracking-[-0.02em] text-inherit no-underline px-2.5 py-1 border border-black/10 rounded-md transition-colors duration-200 ease-in hover:border-black/30 dark:border-white/[0.12] dark:hover:border-white/30 motion-reduce:transition-none">KB</a>
    <div>
      <ul class="hidden md:flex items-center gap-0.5 m-0 p-0 list-none">
        {#each NAV_ITEMS as item (item.id)}
          <li>
            <a
              href={item.link}
              on:click={() => setActive(item.link)}
              aria-current={activeNav === item.link ? 'page' : undefined}
              class="text-[13px] text-inherit no-underline px-3 py-1.5 rounded-md transition-all duration-200 ease-in motion-reduce:transition-none hover:bg-black/5 dark:hover:bg-white/[0.06] {activeNav === item.link ? 'opacity-100 font-semibold text-amber-600 dark:text-amber-400' : 'font-medium opacity-50 hover:opacity-100'}"
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
</div>
