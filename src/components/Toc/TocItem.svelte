<script>
  export let item = {
    text: '',
    level: 0,
    id: ''
  };

  console.log(item)
</script>

{#if item.level === 2}
<li class="font-medium text-sm text-gray-500 hover:text-black truncate ">
  <a href={`#${item.id}`} on:click={() => isOpen.set(false)}>
    {item.text}
  </a>
</li>
{:else if item.level === 3}
<li class="ml-4 text-sm text-gray-500 hover:text-black truncate ">
  <a href={`#${item.id}`} on:click={() => isOpen.set(false)}>
    * {item.text}
  </a>
</li>
{:else if item.level === 4}
<li class="ml-8 text-xs text-gray-500 hover:text-black truncate ">
  <a href={`#${item.id}`} on:click={() => isOpen.set(false)}>
    * {item.text}
  </a>
</li>
{/if}