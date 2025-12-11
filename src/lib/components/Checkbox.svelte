<script>
  import { createEventDispatcher } from 'svelte';
  import { fly, scale } from 'svelte/transition';

  const dispatch = createEventDispatcher();
  export let checked = false;
  export let mt = 0, label = '<label>', size;

</script>

<button class="flex gap-x-2.5 group text-left mt-{mt} cursor-pointer" 
on:click={() => checked = !checked}>
  {#if checked}
    <div class="{size === 'sm' ? 'h-4' : 'h-5'} aspect-square border border-accent-main rounded bg-accent-main"
    in:scale={{ start: .8, duration: 100 }}>
      <i class="fas fa-check relative text-t-primary!
      {size === 'sm' ? 'text-[11px]! -top-[0.4rem]' : 'text-sm! -top-[0.2rem]'}"></i>
    </div>
  {:else}
    <div class="{size === 'sm' ? 'h-4' : 'h-5'} aspect-square border-2 
    {size === 'sm' ? 'border-t-secondary' : 'border-t-primary'} rounded group-hover:outline-1"
    in:scale={{ start: .8, duration: 100 }}></div>
  {/if}
  <p class="cursor-pointer bottom-[0.05rem] relative {size === 'sm' ? 'text-sm!' : ''}">{label}</p><br>
</button>
{#if checked}<div in:fly={{ y: -20, duration: 100 }}><slot /></div>{/if}