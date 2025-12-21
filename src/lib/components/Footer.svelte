<script>
  import { EMAIL, NAME } from "$lib";
  import Logo from "$lib/assets/logo.png";

  export let mt = 0;
  export let clickable = true;
</script>

<footer class="mt-{mt} py-5">
  <div class="layout-wrapper">
    <!-- svelte-ignore a11y_missing_attribut1e -->
    <a class="flex justify-center mb-10" href="{clickable ? '/' : ''}">
      <img src={Logo} alt={NAME} class="w-10">
    </a>
    <p class="max-w-full! text-center">Have other inquiries? Email us: 
      <a href="mailto:{EMAIL}" class="underline underline-offset-2 text-t-primary">{EMAIL}</a>
    </p>
    <div class="flex flex-wrap justify-center mt-10">
      <a class="text-sm!" href="/legal#privacy" target="_blank">Privacy Policy</a>
    </div>
    <p class="mt-5 font-medium text-center max-w-none!">
      © {new Date().getFullYear()} Prometera. All rights reserved.
    </p>
  </div>
</footer>