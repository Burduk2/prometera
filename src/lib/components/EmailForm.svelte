<script>
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  
  export let title;
  export let text;
  export let cta;
  export let emailFormMessage;
  export let uid;

  let isMsgErr = true;
  if (emailFormMessage)
  emailFormMessage?.charAt(0) === '$' ? 0 : isMsgErr = false;

  let emailForm;
  
  const dispatch = createEventDispatcher();
  function handleSubmit() {
    dispatch('submitAction', { uid: uid,  email: emailForm.email.value, form: emailForm});
  }
</script>

<h3>{title}</h3>
<p class="mt-3">{text}</p>
<form on:submit|preventDefault={handleSubmit} class="mt-8" bind:this={emailForm}>
  <input name="email" type="email" autocomplete="email" placeholder="Enter your email"
  class="w-full border-2 border-neutral-300 rounded-md p-2.5" required>
  <button class="brand-btn py-2 px-6 w-full mt-2" type="submit">{cta}</button>
</form>
{#if emailFormMessage}
  <p class="mt-4 font-medium text-{emailFormMessage.charAt(0) === '$' ? 'green-500' : 'red-400'}!"
  transition:fly={{y: -10, duration: 100}}>
    {emailFormMessage.charAt(0) === '$' ? emailFormMessage.slice(1) : emailFormMessage}
  </p>
{/if}