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

<div class="md:max-w-xs overflow-x-hidden h-full">
  <!-- Toggle Button -->
  <button on:click={toggleOpen} class="toggle-button rounded-full px-2 py-1 top-4 md:top-10 opacity-50 md:opacity-100 hover:scale-105">
    {#if $isOpen}
      <i class="bx bx-x text-lg font-medium"></i>
    {:else}
      <i class="bx bx-menu-alt-right text-lg font-medium"></i>
    {/if}
  </button>

  <!-- Table of Contents -->
  <nav
    class="md:max-w-xs p-4 rounded-md transition-all duration-300 ease-in-out overflow-y-hidden bg-white md:bg-transparent h-full {$isOpen
      ? 'translate-y-0 opacity-100'
      : '-translate-y-full opacity-0'}"
  >
    <p class="font-semibold mb-3 text-lg">Table of Contents</p>
    <ul class="space-y-1.5 md:max-w-[15rem] w-full h-full">
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
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    z-index: 50;
  }
</style>
