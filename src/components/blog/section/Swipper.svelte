<script lang="ts">
  import "swiper/swiper-bundle.css";
  import { register } from "swiper/element/bundle";
  import { onMount } from "svelte";
  import BlogCard from "./BlogCard.svelte";
  import type { CollectionEntry } from "astro:content";

  register();

  export let blogs: CollectionEntry<"blogs">[];

  onMount(() => {
    const swiperEl = document.querySelector("swiper-container");
    if (swiperEl) {
      Object.assign(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 500,
        loop: blogs.length > 3,
        navigation: {
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        },
      });
      swiperEl.initialize();
    }
  });
</script>

<div class="max-w-[70rem] mx-auto px-12 md:px-16 relative">
  <!-- Custom Prev Arrow -->
  <button class="swiper-button-prev-custom absolute left-0 md:left-2 top-[40%] -translate-y-1/2 z-10 p-2 text-surface-500 hover:text-accent-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hidden sm:block">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  </button>

  <div class="w-full mx-auto">
    <swiper-container class="blog-swiper" init="false">
      {#each blogs as blog}
        <swiper-slide>
          <BlogCard {blog} />
        </swiper-slide>
      {/each}
    </swiper-container>
  </div>

  <!-- Custom Next Arrow -->
  <button class="swiper-button-next-custom absolute right-0 md:right-2 top-[40%] -translate-y-1/2 z-10 p-2 text-surface-500 hover:text-accent-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hidden sm:block">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  </button>
</div>

<style>
  swiper-container {
    width: 100%;
    padding-bottom: 1.5rem;
  }
  
  swiper-slide {
    display: flex;
    height: auto;
  }
</style>
