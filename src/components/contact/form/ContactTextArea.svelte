<script lang="ts">
  export let name: string;
  export let label: string;
  export let error: string = "";

  export let placeholder: string;
  export let value: string = "";

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    value = target.value;
  };
</script>

<div class="flex flex-col gap-2">
  <label 
    class="text-[11px] font-bold uppercase tracking-[0.1em] text-stone-500 dark:text-stone-400 ml-1" 
    for={name}
  >
    {label}
  </label>
  <textarea
    id={name}
    {name}
    required
    rows="6"
    class="w-full px-5 py-3.5 rounded-lg bg-stone-100/50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all resize-none {error ? 'border-red-500/50 ring-red-500/10' : ''}"
    {placeholder}
    on:input={handleInput}
    bind:value
  ></textarea>
  {#if error}
    <span class="text-[10px] font-bold text-red-500 uppercase tracking-wider mt-1 ml-1">{error}</span>
  {/if}
</div>
