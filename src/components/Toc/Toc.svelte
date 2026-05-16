<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import TocItem from "./TocItem.svelte";

  let headings = writable([]);
  let activeId = writable("");
  let mobileOpen = false;

  function closeMobileToc() {
    mobileOpen = false;
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      closeMobileToc();
    }
  }

  onMount(() => {
    const elements = document.querySelectorAll("h1, h2, h3, h4");
    const headingData = Array.from(elements).map((heading) => ({
      id:
        heading.id ||
        heading.textContent?.toLowerCase().replace(/\s+/g, "-") ||
        "",
      text: heading.textContent || "",
      level: parseInt(heading.tagName[1]),
    }));
    headings.set(headingData);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleHeadings[0]) {
          activeId.set(visibleHeadings[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0.1, 0.2, 0.4, 0.6, 0.8],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="toc-rail fixed left-6 top-24 z-40 hidden xl:block">
  <nav
    class="toc-panel relative h-[calc(100vh-7rem)] max-h-[520px] w-12 overflow-hidden rounded-r-lg border-l border-surface-200/80 bg-white/70 py-3 shadow-sm backdrop-blur-md transition-all duration-300 ease-out hover:w-[300px] hover:border-surface-200 hover:bg-white/95 hover:px-4 hover:shadow-lg focus-within:w-[300px] focus-within:border-surface-200 focus-within:bg-white/95 focus-within:px-4 focus-within:shadow-lg dark:border-surface-800/80 dark:bg-surface-950/60 dark:hover:border-surface-800 dark:hover:bg-surface-950/95 dark:focus-within:border-surface-800 dark:focus-within:bg-surface-950/95"
    aria-label="Table of contents"
  >
    <div class="toc-tab flex h-full min-h-32 w-12 flex-col items-center justify-start gap-3 text-surface-400 transition-opacity duration-200 dark:text-surface-600">
      <span class="mt-1 h-9 w-px rounded-full bg-surface-300 dark:bg-surface-700"></span>
      <span class="writing-vertical text-[9px] font-semibold uppercase tracking-widest">Contents</span>
    </div>

    <div class="toc-content absolute inset-y-0 left-0 w-[300px] overflow-y-auto p-4 pl-5 opacity-0 transition-opacity duration-200">
      <p class="mb-3 text-[10px] font-semibold uppercase tracking-widest text-surface-400 opacity-70 dark:text-surface-500">Contents</p>
      <ul class="w-full space-y-1">
      {#each $headings as heading}
        <TocItem item={heading} active={$activeId === heading.id} />
      {/each}
      </ul>
    </div>
  </nav>
</div>

<button
  type="button"
  class="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-md border border-surface-200/80 bg-white/90 px-3 py-2 text-xs font-medium text-surface-500 shadow-sm backdrop-blur transition-colors hover:border-surface-300 hover:text-surface-900 focus:outline-none focus:ring-1 focus:ring-surface-300 dark:border-surface-800/80 dark:bg-surface-950/90 dark:text-surface-400 dark:hover:border-surface-700 dark:hover:text-surface-100 dark:focus:ring-surface-700 xl:hidden"
  aria-label="Open table of contents"
  aria-expanded={mobileOpen}
  aria-controls="mobile-toc"
  on:click={() => (mobileOpen = true)}
>
  <span aria-hidden="true" class="h-1.5 w-1.5 rounded-full bg-current opacity-60"></span>
  Contents
</button>

{#if mobileOpen}
  <div class="fixed inset-0 z-50 xl:hidden" role="presentation">
    <button
      type="button"
      class="absolute inset-0 h-full w-full bg-surface-950/20 backdrop-blur-[1px] dark:bg-black/40"
      aria-label="Close table of contents"
      on:click={closeMobileToc}
    ></button>

    <nav
      id="mobile-toc"
      class="absolute inset-x-4 bottom-4 mx-auto max-h-[70vh] max-w-xl overflow-y-auto rounded-md border border-surface-200/80 bg-white p-4 shadow-xl dark:border-surface-800/80 dark:bg-surface-950"
      aria-label="Table of contents"
    >
      <div class="mb-3 flex items-center justify-between gap-4">
        <p class="text-[10px] font-semibold uppercase tracking-widest text-surface-400 dark:text-surface-500">Contents</p>
        <button
          type="button"
          class="text-xs font-medium text-surface-400 transition-colors hover:text-surface-900 dark:text-surface-500 dark:hover:text-surface-200"
          on:click={closeMobileToc}
        >
          Close
        </button>
      </div>

      <ul class="w-full space-y-1" on:click={closeMobileToc}>
        {#each $headings as heading}
          <TocItem item={heading} active={$activeId === heading.id} />
        {/each}
      </ul>
    </nav>
  </div>
{/if}

<style>
  .writing-vertical {
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  .toc-panel:hover .toc-tab,
  .toc-panel:focus-within .toc-tab {
    opacity: 0;
    pointer-events: none;
  }

  .toc-panel:hover .toc-content,
  .toc-panel:focus-within .toc-content {
    opacity: 1;
  }
</style>
