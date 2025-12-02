<script>
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  
  export let title;
  export let text;
  export let cta;

  let emailForm;
  
  const dispatch = createEventDispatcher();
  function handleSubmit() {
    dispatch('submitAction', { email: emailForm.email.value, form: emailForm});
  }
</script>

<h3>{title}</h3>
<p class="mt-3">{text}</p>
<form on:submit|preventDefault={handleSubmit} class="mt-8" bind:this={emailForm}>
  <input name="email" type="email" autocomplete="email" placeholder="Enter your email" class="py-3!" required>
  <button class="brand-btn py-2.5! w-full mt-2" type="submit">{cta}</button>
  <p class="text-sm! opacity-70 mt-3">
    By submitting, you agree to our <a target="_blank" href="/legal#privacy" class="underline text-sm!">Privacy Policy</a>
  </p>
  <p class="mt-4 font-medium message"></p>
</form>