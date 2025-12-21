<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
  import { onMount } from 'svelte';

	let { children } = $props();
  onMount(() => document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleModal() }));
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	<link rel="icon" type="image/x-icon" href={favicon}>
  <meta name="robots" content="index, follow">
</svelte:head>

{@render children()}
