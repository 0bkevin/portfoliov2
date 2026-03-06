<script>
  export let item = {
    text: "",
    level: 0,
    id: "",
  };
  export let isOpen;
</script>

{#if item.level === 2}
  <li class="truncate">
    <a href={`#${item.id}`} on:click={() => isOpen.set(false)}
      class="text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200 transition-colors">
      {item.text}
    </a>
  </li>
{:else if item.level === 3}
  <li class="ml-4 truncate flex items-center gap-1.5">
    <span class="w-1 h-1 rounded-full bg-surface-300 dark:bg-surface-700 shrink-0"></span>
    <a href={`#${item.id}`} on:click={() => isOpen.set(false)}
      class="text-xs text-surface-500 dark:text-surface-500 hover:text-surface-900 dark:hover:text-surface-200 transition-colors">
      {item.text}
    </a>
  </li>
{:else if item.level === 4}
  <li class="ml-8 truncate flex items-center gap-1.5">
    <span class="w-0.5 h-0.5 rounded-full bg-surface-300 dark:bg-surface-700 shrink-0"></span>
    <a href={`#${item.id}`} on:click={() => isOpen.set(false)}
      class="text-xs text-surface-400 dark:text-surface-600 hover:text-surface-900 dark:hover:text-surface-200 transition-colors">
      {item.text}
    </a>
  </li>
{/if}
