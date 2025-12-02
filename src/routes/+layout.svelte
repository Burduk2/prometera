<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
  import { TITLE } from '$lib';

let { children } = $props();
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	<link rel="icon" type="image/png" href={favicon} />
  <meta name="robots" content="index, follow">
</svelte:head>

{@render children()}
