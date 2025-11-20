<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(() => {
    const id = new URLSearchParams(window.location.search)?.get('id') || '';
    fetch('/api/write-analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'k': import.meta.env.VITE_MY_API_KEY },
      body: JSON.stringify({
        id: id,
        browser: navigator.userAgent,
        os: navigator.platform,
        language: navigator.language,
        viewport_type: window.innerWidth >= window.innerHeight ? 'landscape' : 'portrait',
        referrer: document.referrer,
      })
    }).catch((e) => console.error("Analytics error:", e));
    
    goto('/');
  });
</script>