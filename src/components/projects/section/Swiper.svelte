<script lang="ts">
  import "swiper/swiper-bundle.css";
  import { register } from "swiper/element/bundle";
  import { onMount } from "svelte";
  import ProjectCard from "./ProjectCard.svelte";
  import type { CollectionEntry } from "astro:content";

  register();

  export let blogs: CollectionEntry<"projects">[];

  onMount(() => {
    const swiperEl = document.querySelector("swiper-container");
    if (swiperEl) {
      Object.assign(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 10,
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
          1024: {
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
        <ProjectCard {blog} />
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
