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

<div>
  <div class="contact__form-div contact__form-area ">
    <label class="contact__form-tag text-xs dark:bg-[#13161d]" for={name}>{label}</label>
    <textarea
      required
      class:error
      class="contact__form-input dark:border-gray-600"
      {placeholder}
      {name}
      on:input={handleInput}
      bind:value
    ></textarea>
  </div>
  {#if error}
    <span class="block text-sm text-red-600 -mt-8 ml-2">{error}</span>
  {/if}
</div>
