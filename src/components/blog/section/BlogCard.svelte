<script lang="ts">
  import { formatDateToDisplay } from "@lib/utils";
  import type { CollectionEntry } from "astro:content";

  export let blog: CollectionEntry<"blogs">;

  const { title, description, pubDate, image, tags } = blog.data;
  const tagsToShow = tags.slice(0, 2);
</script>

<a href={`/0b/${blog.id}`} class="block group w-full">
  <article class="w-full overflow-hidden">
    <div class="aspect-[16/9] overflow-hidden rounded-lg mb-4 bg-surface-100 dark:bg-surface-800">
      {#if image}
        <img
          alt={image.alt}
          src={image.url}
          loading="lazy"
          decoding="async"
          class="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      {/if}
    </div>
    <div class="space-y-2">
      <div class="flex items-center gap-3">
        <time class="text-xs text-surface-400 dark:text-surface-500" dateTime={pubDate.toDateString()}>
          {formatDateToDisplay(pubDate)}
        </time>
        {#each tagsToShow as tag (tag)}
          <span class="text-xs text-surface-400 dark:text-surface-600 capitalize">
            {tag}
          </span>
        {/each}
      </div>
      <h2 class="text-sm font-semibold text-surface-900 dark:text-surface-100 leading-snug group-hover:text-accent-500 transition-colors">{title}</h2>
      <p class="text-xs text-surface-500 dark:text-surface-400 leading-relaxed line-clamp-2">{description}</p>
    </div>
  </article>
</a>
