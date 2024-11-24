<script
  lang="ts"
  src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"
>
  import "swiper/swiper-bundle.css";
  import { register } from "swiper/element/bundle";
  import { onMount } from "svelte";
  import BlogCard from "./BlogCard.svelte";

  import { formatDateToDisplay } from "@lib/utils.ts";
  register();

  export let blogs: {
    data: {
      description: number;
      title: string;
      slug: string;
      pubDate: Date;
      image: {
        url: string;
        alt: string;
      };
    };
    slug: string;
  }[];

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
            slidesPerView: 3,
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
        <BlogCard
          description={blog.data.description}
          image={blog.data.image}
          pubDate={blog.data.pubDate}
          tags={blog.data.tags}
          slug={`${blog.collection}/${blog.slug}`}
          title={blog.data.title}
        />
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

  swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
