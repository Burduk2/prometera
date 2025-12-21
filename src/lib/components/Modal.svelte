<script>
  import { activeModal, toggleModal } from "$lib";
  import { fade, fly } from "svelte/transition";
  
  export let w = 500;
  export let name;

  let wrapper;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
{#if $activeModal === name}
  <div class="fixed bg-black/50 top-0 left-0 w-full h-full z-50 flex items-center justify-center" 
  on:click={e => e.target === wrapper ? toggleModal() : 0} bind:this={wrapper}
  transition:fade={{duration: 150}}>
    <div class="relative bg-bg-main p-10 rounded-lg max-w-full max-h-[90%] overflow-y-scroll" style="width: {w}px"
    transition:fly={{y: 50, duration: 200}}>
      <button on:click={() => toggleModal()} title="Close" class="absolute top-4 right-4 cursor-pointer hover:opacity-80">
        <i class="fas fa-xmark text-lg! text-neutral-400!"></i>
      </button>
      <slot></slot>
    </div>
  </div>
{/if}
