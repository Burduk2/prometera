<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(async () => {
    const hashParam = window.location.hash?.slice(1) || null;
    try {
      const response = await fetch('/api/write-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'k': import.meta.env.VITE_MY_API_KEY },
        body: JSON.stringify({
          id: hashParam,
          browser: navigator.userAgent,
          os: navigator.platform,
          language: navigator.language,
          viewport_type: window.innerWidth >= window.innerHeight ? 'landscape' : 'portrait',
          referrer: document.referrer,
        })
      });
      if (!response.ok) {
        console.error("Something went wrong.");
      }
    } catch {
      console.error("Something went wrong.");
    }
    goto('/');
  });
</script>