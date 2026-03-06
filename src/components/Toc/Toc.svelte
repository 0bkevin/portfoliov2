<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import TocItem from "./TocItem.svelte";

  let headings = writable([]);
  let isOpen = writable(false);

  onMount(() => {
    const elements = document.querySelectorAll("h1, h2, h3");
    const headingData = Array.from(elements).map((heading) => ({
      id:
        heading.id ||
        heading.textContent?.toLowerCase().replace(/\s+/g, "-") ||
        "",
      text: heading.textContent || "",
      level: parseInt(heading.tagName[1]),
    }));
    headings.set(headingData);
  });

  const toggleOpen = () => {
    isOpen.update((n) => !n);
  };
</script>

<div class="md:max-w-xs">
  <button on:click={toggleOpen} class="toggle-button">
    {#if $isOpen}
      <i class="bx bx-x text-sm"></i>
    {:else}
      <i class="bx bx-menu-alt-right text-sm"></i>
    {/if}
  </button>

  <nav
    class="p-4 rounded-lg transition-all duration-300 ease-in-out overflow-y-auto h-full
      bg-white dark:bg-surface-950 border border-surface-200 dark:border-surface-800
      {$isOpen ? 'translate-y-10 opacity-100' : '-translate-y-[110%] opacity-0'}"
  >
    <p class="text-xs font-semibold uppercase tracking-widest text-surface-400 dark:text-surface-500 mb-4">Contents</p>
    <ul class="space-y-1 truncate w-full h-full">
      {#each $headings as heading}
        <TocItem item={heading} toggleOpen={toggleOpen} isOpen={isOpen} />
      {/each}
    </ul>
  </nav>
</div>

<style>
  .toggle-button {
    position: fixed;
    right: 1rem;
    top: 1rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: white;
    z-index: 50;
    cursor: pointer;
    transition: border-color 200ms ease;
  }
  .toggle-button:hover {
    border-color: rgba(0, 0, 0, 0.25);
  }
  :global(.dark) .toggle-button {
    background: #0a0a0a;
    border-color: rgba(255, 255, 255, 0.1);
  }
  :global(.dark) .toggle-button:hover {
    border-color: rgba(255, 255, 255, 0.25);
  }

  @media (min-width: 768px) {
    .toggle-button {
      top: 2.5rem;
    }
  }
</style>
