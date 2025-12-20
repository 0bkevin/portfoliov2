<script>
  export let status;

  import { onDestroy } from "svelte";

  let showMessage = true;
  let timeoutId;  

  $: if (status === "sent") {
    timeoutId = setTimeout(() => {
      showMessage = false;
    }, 5000);
  }

  function dismissPopup() {
    showMessage = false;
  }

  onDestroy(() => {
    clearTimeout(timeoutId);
  });
</script>

<button
  type="submit"
  disabled={status !== "toSend"}
  class="group relative flex items-center justify-center gap-3 py-4 px-8 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs uppercase tracking-[0.2em] w-full overflow-hidden transition-all hover:bg-stone-800 dark:hover:bg-stone-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
>
  <div class="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
  
  {#if status === "sending"}
    <i class="bx bx-loader-alt animate-spin text-lg"></i>
    <span>Sending...</span>
  {:else if status === "sent"}
    <i class="bx bx-check text-lg"></i>
    <span>Message Sent</span>
  {:else if status === "error"}
    <i class="bx bx-error-circle text-lg"></i>
    <span>Error Occurred</span>
  {:else}
    <span>Send Message</span>
    <i class="bx bx-right-arrow-alt text-lg group-hover:translate-x-1 transition-transform"></i>
  {/if}
</button>

{#if status === "sent" && showMessage}
  <div role="alert" class="mt-6 p-5 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200/50 dark:border-green-800/30 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
    <div class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
      <i class="bx bx-check text-green-600 dark:text-green-400 text-lg"></i>
    </div>
    <div class="flex-1">
      <p class="text-xs font-bold text-green-800 dark:text-green-300 uppercase tracking-widest">Success</p>
      <p class="text-sm text-stone-600 dark:text-stone-400 mt-1">Your message has been received. I'll get back to you shortly.</p>
    </div>
    <button on:click={dismissPopup} class="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors">
      <i class="bx bx-x text-xl"></i>
    </button>
  </div>
{/if}

{#if status === "error" && showMessage}
  <div role="alert" class="mt-6 p-5 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200/50 dark:border-red-800/30 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
    <div class="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
      <i class="bx bx-error-circle text-red-600 dark:text-red-400 text-lg"></i>
    </div>
    <div class="flex-1">
      <p class="text-xs font-bold text-red-800 dark:text-red-300 uppercase tracking-widest">Error</p>
      <p class="text-sm text-stone-600 dark:text-stone-400 mt-1">Something went wrong. Please try again or contact me directly.</p>
    </div>
    <button on:click={dismissPopup} class="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors">
      <i class="bx bx-x text-xl"></i>
    </button>
  </div>
{/if}