<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import TocItem from "./TocItem.svelte";

  let headings = writable([]);
  let activeId = writable("");

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

<div class="toc-rail fixed left-6 top-24 z-40 hidden xl:block w-[280px]">
  <nav class="max-h-[calc(100vh-7rem)] overflow-y-auto p-4 transition-opacity duration-200 hover:opacity-100">
    <p class="text-xs font-semibold uppercase tracking-widest text-surface-400 dark:text-surface-500 mb-4 opacity-60">Contents</p>
    <ul class="space-y-1 truncate w-full h-full">
      {#each $headings as heading}
        <TocItem item={heading} active={$activeId === heading.id} />
      {/each}
    </ul>
  </nav>
</div>
