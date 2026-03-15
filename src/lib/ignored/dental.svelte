<script>
  import logoImg from '$lib/assets/logo.png';
  import line1Img from '$lib/assets/vector-line1.svg';
  import line2Img from '$lib/assets/vector-line2.svg';
  import line3Img from '$lib/assets/vector-line3.svg';
  // import ogImg from '$lib/assets/og-image.png';
  import mMockAlerts from '$lib/assets/mock-alerts.png';
  import mMockAsinCard from '$lib/assets/mock-asin-card.png';
  import mDemoVideo from '$lib/assets/demo-video.mov';
  import mCompetitorAlert from '$lib/assets/competitor-alert.png';
  import mActionNeeded from '$lib/assets/actions-needed.png';
  import mNotfChannels from '$lib/assets/mock-notf-channels.png';
  import Footer from '$lib/components/Footer.svelte';
  import { NAME, EMAIL, DOMAIN, TITLE, DESC, toggleModal, activeModal, submitAction } from '$lib/index.js';
  import { onMount } from 'svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { on } from 'svelte/events';
  import { fade, fly } from 'svelte/transition';
  import EmailForm from '$lib/components/EmailForm.svelte';
  import Nav from '$lib/components/SimpleNav.svelte';

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const url = new URL(window.location.href);
    const coldEmailRef = params?.get('ref') || '';
    url.searchParams.delete('ref');
    window.history.replaceState({}, '', url);
    if (coldEmailRef) submitAction('', null, 'cold_email_refer', { action_details: coldEmailRef });
  });

  const primaryCtaText = 'Get a Free Homepage Audit';
  const secondaryCtaText = 'Book a Demo';

  let heroHlighted = 1;
  onMount(() => setInterval(() => { heroHlighted = heroHlighted === 1 ? 2 : 1 }, 4000));

  let selectedFAQ;
  let inviteLink;
</script>

<svelte:head>
  <title>{TITLE}</title>
  <meta name="description" content={DESC}>

  <meta property="og:title" content={TITLE}>
  <meta property="og:description" content={DESC}>
  <meta property="og:url" content="https://{DOMAIN}/">
  <meta property="og:image" content={mMockAsinCard}>
  
  <meta name="twitter:title" content={TITLE}>
  <meta name="twitter:description" content={DESC}>
  <meta name="twitter:image" content={mMockAsinCard}>
</svelte:head>

<img src="{line1Img}" alt="line" class="w-full absolute top-18 left-0 z-0 select-none opacity-10" draggable="false" />
<Nav />

<!-- hero -->
<div class="layout-wrapper my-40! pt-10 hero-sect flex flex-col justify-center z-10 relative">
  <div>
    <div class="flex gap-x-4 flex-col items-center">
      <h1 class="text-center hero-title text-t-secondary!">
        Stop losing patients to a confusing website. We
        <span class="text-h1! not-sm:text-h1-mobile! font-main! hero-hlight" class:hlighted={heroHlighted === 1}>
          find
        </span>
        <i class="fa-solid fa-eye"></i> &
        <span class="text-h1! not-sm:text-h1-mobile! font-main! hero-hlight" class:hlighted={heroHlighted === 2}>
          fix
        </span>
        <i class="fa-solid fa-magnifying-glass-dollar"></i>
        your clinic's booking leaks in 7 days
      </h1>
      <p class="sm:text-center mt-3!">{DESC}</p>
      <div class="cta-container flex gap-x-3 gap-y-2 flex-wrap mt-8">
        <a href="#bottom" class="brand-btn not-sm:block! not-sm:w-full!">
          {primaryCtaText} <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>
</div>

<Footer mt={0} />
<div id="bottom"></div>

<Modal name="signup">
  <EmailForm title="Join the Waitlist & Get a Checklist" cta="Join & Get the Checklist"
  text="Spot risks early and protect your revenue before your ASINs lose the Buy Box." 
  on:submitAction={async (e) => {
    const ok = await submitAction(e.detail.email, e.detail.form, 'sentinel_subscribe');
    if (ok) localStorage.setItem('emailSubmitted', 'true');
    toggleModal('signup-thx', true);
  }} />
</Modal>
<Modal name="signup-thx" w={550}>
  <h3>You’re on the Waitlist!</h3>
  <p class="mt-2">Thanks for signing up! You’re now first in line to try Prometera BuyBox Sentinel when it launches.</p>
  <hr class="border-neutral-300 my-7">
  <ul class="flex flex-col gap-y-2">
    <li>You’ll be notified as soon as early access opens.</li>
    <li>Get feature previews, tips, and updates while we build.</li>
    <li>Enjoy a 1-month free trial once the tool is out.</li>
    <li>
      <a href="https://www.notion.so/Buy-Box-Risk-Checklist-2d5b3f35e80d80088619fb04001d94e8" 
      class="hover:underline underline-offset-2 text-accent-main! brightness-80" target="_blank">
        View the Checklist <i class="fa-solid fa-arrow-up-right-from-square text-accent-main! relative bottom-px ml-px"></i>
      </a>
    </li>
  </ul>
  <hr class="border-neutral-300 my-7">
  <h5>Invite a Friend</h5>
  <p class="mt-2">
    If you know another Amazon seller who would benefit from early BuyBox Sentinel, sharing the 
    link helps us validate priorities and ship faster.
  </p>
  <div class="relative mt-4 bg-neutral-200/70 p-2 rounded-sm flex items-center justify-center">
    <p class="font-mono! select-all" bind:this={inviteLink}>https://{DOMAIN}</p>
    <button class="absolute right-2 cursor-pointer hover:opacity-60" title="Copy to clipboard" on:click={() => {
      const text = inviteLink.innerText;
      navigator.clipboard.writeText(text);
      inviteLink.innerText = 'Copied to clipboard!';
      setTimeout(() => inviteLink.innerText = text, 3000);
    }}>
      <i class="fas fa-copy"></i>
    </button>
  </div>
</Modal>