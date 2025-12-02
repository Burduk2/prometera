<script>
  import { EMAIL, NAME } from "$lib";
  import Logo from "$lib/assets/logo.png";

  export let mt = 0;
</script>

<footer class="mt-{mt} py-5">
  <div class="layout-wrapper">
    <a class="flex justify-center mb-10" href="/">
      <img src={Logo} alt={NAME} class="w-10">
    </a>
    <p class="max-w-full! text-center">Have other inquries? Email us: 
      <a href="mailto:{EMAIL}" class="underline underline-offset-2 text-t-primary">{EMAIL}</a>
    </p>
    <p class="text-xs! max-w-full! text-center mt-10">
      All data is sourced from publicly available business information. Prometera does not collect private or sensitive data, nor scrape protected content. All data is provided strictly for legitimate business purposes.
    </p>
    <p class="mt-5 font-medium text-center max-w-none!">
      © {new Date().getFullYear()} Prometera. All rights reserved.
    </p>
  </div>
</footer>