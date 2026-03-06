<script>
  let darkMode = localStorage.getItem("darkMode") !== "false";

  function toggleDarkMode() {
    darkMode = !darkMode;
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  if (darkMode) {
    document.documentElement.classList.add("dark");
  }
</script>

<button
  on:click={toggleDarkMode}
  class="toggle-btn"
  aria-label="Toggle dark mode"
>
  {#if darkMode}
    <i class="bx bx-sun text-sm"></i>
  {:else}
    <i class="bx bx-moon text-sm"></i>
  {/if}
</button>

<style>
  .toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 6px;
    border: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 200ms ease, background-color 200ms ease;
  }
  .toggle-btn:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.04);
  }
  :global(.dark) .toggle-btn:hover {
    background-color: rgba(255, 255, 255, 0.06);
  }
</style>
