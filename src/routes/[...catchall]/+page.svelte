<script>
  import { onMount } from 'svelte';
  import Home from '../+page.svelte';
  import { submitAction } from '$lib';
  
  export let data;
  onMount(() => { 
    history.replaceState(null, '', '/');
    if (data.ref) submitAction('', null, data.ref, { action_details: data.ref }) 
  });
</script>

<Home />