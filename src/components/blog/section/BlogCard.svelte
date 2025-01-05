<script lang="ts">
  import { formatDateToDisplay } from "@lib/utils";
  import type { CollectionEntry } from "astro:content";

  export let blog: CollectionEntry<"blogs">;

  const { title, description, pubDate, image, tags } = blog.data;

  const tagsToShow = tags.slice(0, 2);
</script>

<a href={`/0b/${blog.id}`}>
<article
  class="max-w-xs max-h-[350px] min-h-[350px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md cursor-pointer mb-10"
>
  <div class="aspect-[16/9] overflow-hidden">
    {#if image}
      <img
        alt={image.alt}
        src={image.url}
        class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
      />
    {/if}
  </div>
  <div class="p-4">
    <div class="mb-3 flex items-center gap-4">
      <time class="rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600" dateTime={pubDate.toDateString()}>
        <i class="bx bx-calendar text-xs"></i> {formatDateToDisplay(pubDate)}
      </time>
      <div class="flex gap-2">
        {#each tagsToShow as tag (tag)}
          <span
            class="capitalize rounded-md  bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-100"
          >
            {tag}
          </span>
        {/each}
      </div>
    </div>
    <h2 class="mb-2 text-base font-bold text-gray-900 text-left leading-tight">{title}</h2>
    <p class="text-sm text-gray-600 text-left max-h-10 overflow-hidden">{description}</p>
  </div>
</article>
</a>
