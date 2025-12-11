<script>
  import { NAME } from "$lib/index.js";
  import logoImg from "$lib/assets/logo.png";
  
  export let tw = '', clickable = true;
</script>
<nav class="layout-wrapper pt-8 {tw}">
  <a href="{clickable ? '/' : ''}" class="flex items-center group">
    <img src={logoImg} alt={NAME} class="h-6 mr-1 rounded-full group-hover:rotate-45 transition" />
    <h3 class="select-none text-p! font-light">{NAME}</h3>
  </a>
</nav>