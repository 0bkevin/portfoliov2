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
  class="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg bg-surface-900 dark:bg-surface-100 text-white dark:text-surface-900 text-sm font-medium transition-colors hover:bg-surface-800 dark:hover:bg-surface-200 disabled:opacity-40 disabled:cursor-not-allowed"
>
  {#if status === "sending"}
    <i class="bx bx-loader-alt animate-spin text-sm"></i>
    <span>Sending...</span>
  {:else if status === "sent"}
    <i class="bx bx-check text-sm"></i>
    <span>Sent</span>
  {:else if status === "error"}
    <i class="bx bx-error-circle text-sm"></i>
    <span>Error</span>
  {:else}
    <span>Send Message</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  {/if}
</button>

{#if status === "sent" && showMessage}
  <div role="alert" class="mt-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200/50 dark:border-green-800/30 flex items-center gap-3">
    <i class="bx bx-check text-green-600 dark:text-green-400"></i>
    <p class="text-sm text-green-800 dark:text-green-300 flex-1">Message sent successfully.</p>
    <button on:click={dismissPopup} class="text-green-400 hover:text-green-600 transition-colors">
      <i class="bx bx-x text-lg"></i>
    </button>
  </div>
{/if}

{#if status === "error" && showMessage}
  <div role="alert" class="mt-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200/50 dark:border-red-800/30 flex items-center gap-3">
    <i class="bx bx-error-circle text-red-600 dark:text-red-400"></i>
    <p class="text-sm text-red-800 dark:text-red-300 flex-1">Something went wrong. Please try again.</p>
    <button on:click={dismissPopup} class="text-red-400 hover:text-red-600 transition-colors">
      <i class="bx bx-x text-lg"></i>
    </button>
  </div>
{/if}
