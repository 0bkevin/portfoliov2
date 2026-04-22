<script>
  export let item = {
    text: "",
    level: 0,
    id: "",
  };
  export let active = false;
</script>

{#if item.level === 2}
  <li class="truncate">
    <a href={`#${item.id}`}
      class={`text-sm font-medium transition-opacity transition-colors hover:opacity-90 ${active ? "text-surface-950 dark:text-surface-100 opacity-100" : "text-surface-600 dark:text-surface-400 opacity-75 hover:text-surface-900 dark:hover:text-surface-200"} block py-1`}>
      {item.text}
    </a>
  </li>
{:else if item.level === 3}
  <li class="ml-3 truncate flex items-center gap-1">
    <span class="w-1 h-1 rounded-full bg-surface-300 dark:bg-surface-700 shrink-0"></span>
    <a href={`#${item.id}`}
      class={`text-xs transition-opacity transition-colors hover:opacity-90 ${active ? "text-surface-950 dark:text-surface-100 opacity-100" : "text-surface-500 dark:text-surface-500 opacity-70 hover:text-surface-900 dark:hover:text-surface-200"} block py-0.5`}>
      {item.text}
    </a>
  </li>
{:else if item.level === 4}
  <li class="ml-6 truncate flex items-center gap-1">
    <span class="w-0.5 h-0.5 rounded-full bg-surface-300 dark:bg-surface-700 shrink-0"></span>
    <a href={`#${item.id}`}
      class={`text-xs transition-opacity transition-colors hover:opacity-90 ${active ? "text-surface-950 dark:text-surface-100 opacity-100" : "text-surface-400 dark:text-surface-600 opacity-65 hover:text-surface-900 dark:hover:text-surface-200"} block py-0.5`}>
      {item.text}
    </a>
  </li>
{/if}
