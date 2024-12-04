<script lang="ts">
  import { formatDateToDisplay } from "@lib/utils";
  export let description: number,
    title: string,
    slug: string,
    tags: string[],
    pubDate: Date,
    image: {
      url: string;
      alt: string;
    };

    console.log(title)
</script>

<article
  class="max-w-xs swiper-slide relative overflow-hidden rounded-lg shadow transition hover:shadow-lg aspect-square"
>

{#if image}
  <img
    alt={image.alt}
    src={image.url}
    class="absolute inset-0 h-full w-full object-cover"
  />
{/if}
  <div
    class="text-start relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-28 h-full"
  >
    <div class="p-4 sm:p-6">
      <time
        datetime="2022-10-10"
        class="text-slate-300 block text-xs font-medium text-white/90"
        >{formatDateToDisplay(pubDate)}
      </time>

      <h3 class="mt-0.5 font-medium text-white truncate max-w-sm">
        {title}
      </h3>
      <p class="mt-2 line-clamp-3 text-sm/relaxed text-slate-300">
        {description}
      </p>
      <a
        href={slug}
        class="mt-2 bg-transparent text-white px-3 py-1 rounded-full text-xs border-slate-300 border hover:bg-white hover:text-black transition-colors hover:font-medium"
      >
        Read
      </a>
    </div>
  </div>
</article>
