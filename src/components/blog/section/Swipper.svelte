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
        spaceBetween: 15,
        speed: 500,
        loop: true,
        autoplayDelay: 2000,
        autoplayDisableOnInteraction: false,
        pagination: {
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          850: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1099: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      });
      swiperEl.initialize();
    }
  });
</script>

<div class="max-w-7xl xl:mx-auto">
  <swiper-container class="mySwiper" init="false" navigation="true">
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
    height: 100%;
  }

  swiper-slide {
    text-align: center;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
