<script>
  let darkMode = localStorage.getItem("darkMode") === "true";

  function toggleDarkMode() {
    darkMode = !darkMode;
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  // Apply the saved mode on page load
  if (darkMode) {
    document.documentElement.classList.add("dark");
  }
</script>

<button on:click={toggleDarkMode} class="ml-3">
  {#if darkMode}
    <i class="bx bx-sun text-lg"></i>
  {:else}
    <i class="bx bx-moon text-lg"></i>
  {/if}
</button>

<style>
</style>
