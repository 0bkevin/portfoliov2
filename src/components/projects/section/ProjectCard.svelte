<script lang="ts">
  import { formatDateToDisplay } from "@lib/utils";
  export let description: number,
    demoUrl: string,
    title: string,
    slug: string,
    pubYear: Date


</script>

<article
  class="max-w-xs swiper-slide relative overflow-hidden rounded-lg shadow transition hover:shadow-lg aspect-square"
>


  <div
    class="text-start relative bg-gradient-to-t from-gray-950 to-green-800 pt-36 h-full"
  >
    <div class="p-4 sm:p-6">
      <time
        datetime="2022-10-10"
        class="text-slate-300 block text-xs font-medium text-white/90"
        >{new Date(pubYear).getFullYear()}
      </time>

      <h3 class="mt-0.5 font-medium text-white  line-clamp-3 max-w-sm">
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
      {#if demoUrl}
        <a
          href={demoUrl}
          class="mt-2 bg-transparent text-white px-3 py-1 rounded-full text-xs border-slate-300 border hover:bg-white hover:text-black transition-colors hover:font-medium"
        >
          Demo
        </a>
      {/if}
    </div>
  </div>
</article>
