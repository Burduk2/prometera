<script>
  import { NAME } from "$lib/index.js";
  import logoImg from "$lib/assets/logo-nobg.png";
  import { onMount } from "svelte";

  let shadow = false;
  onMount(() => window.addEventListener('scroll', () => shadow = window.scrollY !== 0));
</script>

<nav class="bg-bg-main/50 backdrop-blur-lg fixed z-50 w-full left-0 top-0 py-4 transition"
style={shadow ? 'box-shadow: 0 0 1rem 0 #0003' : ''}>
  <div class="layout-wrapper flex justify-between"> 
    <a href="/" class="flex items-center group">
      <img src={logoImg} alt={NAME} class="h-6 mr-1 rounded-full group-hover:rotate-45 transition" />
      <h3 class="select-none text-p! font-light">{NAME}</h3>
    </a>
    <div class="flex gap-x-6 items-center">
      <a href="/">About</a>
      <a href="/">Solutions</a>
      <a href="/">Pricing</a>
      <a class="brand-btn" href="/">Get Started</a>
    </div>
  </div>
</nav>