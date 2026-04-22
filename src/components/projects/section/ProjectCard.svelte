<script lang="ts">
  import type { CollectionEntry } from "astro:content";

  export let project: CollectionEntry<"projects">;

  const { title, description, pubYear, image, tags, studyCaseUrl } = project.data;
  const tagsToShow = tags.slice(0, 3);
</script>

<a href={studyCaseUrl ?? `/projects/${project.id}`} class="group block w-full outline-none">
  <article class="flex flex-col gap-4">
    <div class="relative w-full aspect-video overflow-hidden rounded-xl bg-surface-100 dark:bg-surface-800 ring-1 ring-surface-200/50 dark:ring-surface-700/50">
      {#if image}
        <img
          alt={image.alt}
          src={image.url}
          class="h-full w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
        />
      {/if}
      <div class="absolute inset-0 bg-surface-900/0 transition-colors duration-500 group-hover:bg-surface-900/5 dark:group-hover:bg-surface-900/20"></div>
    </div>
    
    <div class="flex flex-col gap-1.5">
      <div class="flex items-center gap-2.5 text-[0.7rem] uppercase tracking-widest text-surface-500 dark:text-surface-400 mb-0.5">
        <span class="font-medium text-surface-900 dark:text-surface-200">{pubYear ? pubYear.getFullYear() : ""}</span>
        <span class="h-0.5 w-0.5 rounded-full bg-surface-300 dark:bg-surface-700"></span>
        <div class="flex gap-2">
          {#each tagsToShow as tag (tag)}
            <span>{tag}</span>
          {/each}
        </div>
      </div>
      
      <div>
        <h3 class="flex items-center gap-2 text-base font-semibold tracking-tight text-surface-900 transition-colors duration-300 group-hover:text-accent-600 dark:text-surface-100 dark:group-hover:text-accent-400">
          {title}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="translate-y-1 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
        </h3>
        <p class="mt-1 line-clamp-2 text-sm leading-relaxed text-surface-600 dark:text-surface-400">
          {description}
        </p>
      </div>
    </div>
  </article>
</a>
