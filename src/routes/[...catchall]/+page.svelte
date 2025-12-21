<script>
  import { onMount } from 'svelte';
  import Home from '../+page.svelte';
  import { submitAction } from '$lib';
  
  export let data;
  onMount(() => { 
    const id = new URLSearchParams(window.location.search)?.get('id') || '';
    history.replaceState(null, '', '/');
    if (data.ref) submitAction('', null, data.ref, { action_details: id }); 
  });
</script>

<Home />