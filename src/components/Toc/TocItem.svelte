<script>
  export let item = {
    text: "",
    level: 0,
    id: "",
  };
  export let isOpen;
</script>

{#if item.level === 2}
  <li class="font-medium text-sm text-gray-500 dark:text-gray-300 hover:text-black truncate">
    <a href={`#${item.id}`} on:click={() => isOpen.set(false)}>
      {item.text}
    </a>
  </li>
{:else if item.level === 3}
  <li
    class="ml-4 text-sm text-gray-500 dark:text-gray-300 hover:text-black truncate flex items-center gap-1"
  >
    <i class="bx bxs-circle !text-[0.30rem]"></i>
    <a href={`#${item.id}`} on:click={() => isOpen.set(false)}>
      {item.text}
    </a>
  </li>
{:else if item.level === 4}
  <li class="ml-8 text-xs text-gray-500 dark:text-gray-300 hover:text-black truncate gap-1">
    <i class="bx bxs-circle !text-[0.30rem]"></i>
    <a href={`#${item.id}`} on:click={() => isOpen.set(false)}>
      {item.text}
    </a>
  </li>
{/if}
