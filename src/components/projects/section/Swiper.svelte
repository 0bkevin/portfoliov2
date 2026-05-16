<script lang="ts">
  import "swiper/swiper-bundle.css";
  import { register } from "swiper/element/bundle";
  import { onMount } from "svelte";
  import ProjectCard from "./ProjectCard.svelte";
  import type { CollectionEntry } from "astro:content";

  register();

  export let projects: CollectionEntry<"projects">[];
  let swiperEl: HTMLElement & {
    initialize?: () => void;
  };

  onMount(() => {
    if (swiperEl) {
      Object.assign(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 500,
        loop: projects.length > 3,
        navigation: {
          nextEl: '.project-swiper-button-next',
          prevEl: '.project-swiper-button-prev',
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
  <button class="project-swiper-button-prev absolute left-0 md:left-2 top-[40%] -translate-y-1/2 z-10 p-2 text-surface-500 hover:text-accent-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hidden sm:block">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  </button>

  <div class="w-full mx-auto">
    <swiper-container bind:this={swiperEl} class="project-swiper" init="false">
      {#each projects as project}
        <swiper-slide>
          <ProjectCard {project} />
        </swiper-slide>
      {/each}
    </swiper-container>
  </div>

  <button class="project-swiper-button-next absolute right-0 md:right-2 top-[40%] -translate-y-1/2 z-10 p-2 text-surface-500 hover:text-accent-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hidden sm:block">
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
