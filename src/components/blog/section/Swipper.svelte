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
        navigation: true,
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

<div class="max-w-5xl mx-auto px-6 md:px-8">
  <swiper-container class="blog-swiper" init="false">
    {#each blogs as blog}
      <swiper-slide>
        <BlogCard {blog} />
      </swiper-slide>
    {/each}
  </swiper-container>
</div>

<style>
  swiper-container {
    width: 100%;
    padding-bottom: 3.5rem;
    --swiper-navigation-color: #525252;
    --swiper-navigation-size: 22px;
    --swiper-navigation-sides-offset: 0px;
    --swiper-navigation-top-offset: auto;
  }
  :global(.dark) swiper-container {
    --swiper-navigation-color: #a3a3a3;
  }
  swiper-slide {
    display: flex;
    height: auto;
  }
</style>
