<script>
  import { fade } from "svelte/transition";

  export let text = "Tooltip text";
</script>

<div class="relative group inline-block">
  <slot></slot>
  <div class="absolute bottom-full left-0 transform mb-2 
  hidden group-hover:block bg-black text-neutral-400! text-sm! px-3 py-2 
  rounded whitespace-nowrap z-10">
    {text}
  </div>
</div>
