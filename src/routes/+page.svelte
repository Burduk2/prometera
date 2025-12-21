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

  const primaryCtaText = 'Join the Waitlist';
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
<Nav tool />

<!-- hero -->
<div class="layout-wrapper my-40! pt-10 hero-sect flex flex-col justify-center z-10 relative">
  <div>
    <div class="flex gap-x-4 flex-col items-center">
      <h1 class="text-center hero-title text-t-secondary!">
          <span class="text-h1! not-sm:text-h1-mobile! font-main! hero-hlight" class:hlighted={heroHlighted === 1}>
            Prevent
          </span>
          Buy Box Loss <i class="fa-solid fa-eye"></i> — 
          <span class="text-h1! not-sm:text-h1-mobile! font-main! hero-hlight" class:hlighted={heroHlighted === 2}>
            Protect
          </span>
          Your Revenue <i class="fa-solid fa-magnifying-glass-dollar"></i>
          <!-- <i class="fa-solid fa-shield"></i> -->
      </h1>
      <p class="sm:text-center mt-3!">{DESC}</p>
      <div class="cta-container flex gap-x-3 gap-y-2 flex-wrap mt-8">
        <button on:click={() => toggleModal('signup')} class="brand-btn not-sm:block! not-sm:w-full!">
          {primaryCtaText} <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
    <div class="relative mt-12">
      <div class="flex justify-center sm:w-[80%] m-auto rounded-lg overflow-hidden border-2 
      border-neutral-200 border-b-transparent">
        <video src={mDemoVideo} autoplay muted loop class="bottom-1 relative"></video>
      </div>
      <div class="absolute h-[60%] w-full bg-linear-to-t from-white to-transparent bottom-0 z-50"></div>
    </div>
  </div>
</div>

<!-- why -->
<section class="layout-wrapper border-t border-b py-10 border-neutral-200">
  <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-10 gap-y-8">
    <h2 class="sect-title w-[300px] max-w-full">Most Tools Warn You Too Late</h2>
    {#each Object.entries({
      'fas fa-circle-xmark text-neutral-800!': [
        'Other tools',
        'Alert after the Buy Box is lost',
        'Let your revenue leak',
      ],
      'fas fa-circle-check text-accent-main! brightness-90': [
        'BuyBox Sentinel',
        'Early warnings so the Buy Box is not lost',
        'Keeps your revenue protected',
        'Focused, simple interface'
      ]
    }) as [icon, items], i}
      <div class="flex flex-col gap-y-3">
        {#each items as item, j}
          {#if j === 0}
            {#if i === 0}
              <h5>{item}</h5>
            {:else}
              <h5>
                {item}
                <button on:click={() => toggleModal('signup')} title={primaryCtaText}
                class="hover:bg-neutral-100 p-1.5 rounded-md cursor-pointer transition relative bottom-[1.5px]">
                  <i class="fas fa-arrow-up-right-from-square text-t-primary!"></i>
                </button>
              </h5>
            {/if}
          {:else}
            <div class="flex">
              <div class="w-7">
                <i class="{icon}"></i> 
              </div>
              <p class="flex-1">{item}</p>
            </div>
          {/if}
        {/each}
      </div>
    {/each}
  </div>
</section>

<!-- how it works -->
<section class="layout-wrapper pt-30">
  <h1 class="sect-title flex gap-2.5 flex-wrap">
    Protect up to
    <span class="text-h1! not-sm:text-h1-mobile! font-main! text-accent-main! flex items-center gap-1 brightness-85">
      <i class="fa-solid fa-arrow-trend-up text-h3! not-sm:text-sm! text-accent-main!"></i>82%
    </span>
    of your revenue
  </h1>
  <p>
    82% of purchases happen through the Buy Box. Our alerts tell you when there's risk of losing 
    it, so you can protect your revenue.
  </p>
  <div class="flex flex-col lg:mt-10 mt-20">
    {#each [
      {
        title: 'See competitor moves instantly',
        text: 'Get alerts on price drops, stock changes, and promotions before they hurt your revenue.',
        cta: 'Tell us your ICP',
        icon: 'fa-solid fa-chess-pawn',
        img: mCompetitorAlert,
      }, {
        title: 'Actionable alerts',
        text: 'Know when and what action is needed so you don’t miss sales.',
        cta: primaryCtaText,
        icon: 'fas fa-hand-holding-dollar',
        img: mActionNeeded,
      }, {
        title: 'Save time',
        text: 'Alerts let you act fast instead of manually tracking your ASINs.',
        cta: primaryCtaText,
        icon: 'fas fa-business-time',
        img: mNotfChannels,
      }
    ] as item, i}
      <div class="sm:py-10 py-10 border-l border-neutral-300 border-dashed">
        <i class="{item.icon} sticky top-22 text-2xl! text-accent-main! brightness-85 -translate-x-1/2"></i>
        <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,400px))] gap-x-10 gap-y-8 h-50 justify-between
        w-[1000px] m-auto max-w-full px-10">
          <div class="flex flex-col w-[400px] max-w-full" class:lg:order-2={i % 2 !== 0}>
            <h5>{item.title}</h5>
            <p class="mt-2">{item.text}</p>
          </div>
          <div class="relative flex justify-center items-start">
            <img src={item.img} alt={item.title} class="w-full h-auto object-contain lg:sticky top-20">
          </div>
        </div>
      </div>
    {/each}
    <button on:click={() => toggleModal('signup', true)} class="brand-btn mt-5 not-lg:mt-20 py-3!">
      {primaryCtaText} <i class="fa-solid fa-arrow-right"></i>
    </button>
  </div>
</section>

<!-- for who -->
<section class="layout-wrapper mt-40!">
  <div class="brand-box p-10 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-10 gap-y-8">
    <div>
      <h2 class="sect-title">
        Built for 
        <span class="text-h2! not-sm:text-h2-mobile! font-main! text-orange-600!">
          <i class="fa-brands fa-amazon text-h3! not-sm:text-h3-mobile! text-orange-600! -mr-1"></i> FBA Sellers
        </span>
        Who
      </h2>
    </div>
    <div class="flex flex-col gap-y-3">
      {#each [
        {
          icon: '🛍️',
          text: 'Have 10–50 ASINs and $5k–$50k monthly revenue'
        },
        {
          icon: '📦',
          text: 'Actively track listings, inventory, and pricing',
        }, {
          icon: '⚡',
          text: 'Want proactive alerts instead of reactive reports',
        }, {
          icon: '💰',
          text: 'Value revenue protection and time savings',
        }, {
          icon: '🖥️',
          text: 'Prefer a focused, simple interface',
        },
      ] as item}
        <p><span class="mr-2">{item.icon}</span> {item.text}</p>
      {/each}
    </div>
  </div>
</section>

<!-- what you get -->
<section class="layout-wrapper pt-40">
  <h1 class="sect-title">What You Get by Joining the Waitlist</h1>
  <p>Reserve your spot now to be among the first to experience Prometera BuyBox Sentinel when it launches.</p>
  <div class="gap-5 mt-8 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
    {#each [
      {
        title: 'Priority Access at Launch',
        text: 'Be among the first to try BuyBox Sentinel at launch.',
        icon: 'fa-solid fa-hourglass-start'
      }, {
        title: 'Insider Updates',
        text: 'Receive feature previews, tips, and strategies as we build.',
        icon: 'fa-solid fa-lightbulb'
      }, {
        title: 'Early Trial Opportunity',
        text: 'Get 1 month of free access to the tool after launch.',
        icon: 'fa-solid fa-bolt'
      },
    ] as item, i}
      <div class="brand-box p-7 flex flex-col justify-between">
        <div>
          <p class="font-medium text-2xl! mb-10">
            0{i + 1}
          </p>
          <i class="{item.icon} text-accent-main! text-2xl! mb-5 brightness-85"></i>
          <h5>{item.title}</h5>
          <p class="mt-2">{item.text}</p>
        </div>
      </div>
    {/each}
    <button on:click={() => toggleModal('signup')} class="brand-btn not-sm:py-4! py-3!">
      {primaryCtaText} <i class="fa-solid fa-arrow-right"></i>
    </button>
  </div>
</section>

<!-- faq -->
<section class="layout-wrapper pt-40 w-[1000px]!">
  <h1 class="sect-title">FAQ</h1>
  <div>
    {#each [
      {
        q: 'When will the tool be available',
        a: 'Prometera BuyBox Sentinel is currently in pre-launch. Waitlist members will be notified first when early access opens.'
      }, {
        q: 'Who is it for',
        a: 'The tool is designed for FBA sellers with 10–50 ASINs who want to protect revenue and save time.'
      }, {
        q: 'Do I need technical skills to use it',
        a: 'No technical expertise is required. Setup is simple: just import your ASINs and set your alert thresholds.'
      }, {
        q: 'Can I use it for all my ASINs or only FBA listings',
        a: 'You can use Prometera BuyBox Sentinel for all types of listings, not just FBA.'
      }
    ] as item}
      <div class="border-b border-neutral-300">
        <button class="flex items-center justify-between w-full gap-2 group py-3" on:click={() =>
          selectedFAQ === item.q ? selectedFAQ = null : selectedFAQ = item.q
        }>
          <h5 class="group-hover:opacity-70 text-left">{item.q}?</h5>
          <i class="fa-solid fa-chevron-down group-hover:translate-y-1 transition"
          class:rotate-180={selectedFAQ === item.q}></i>
        </button>
        {#if selectedFAQ === item.q}
          <p class="mt-2 pb-4">{item.a}</p>
        {/if}
      </div>
    {/each}
  </div>
</section>

<Footer mt={20} />

<Modal name="signup">
  <EmailForm title="Join the Waitlist" cta={primaryCtaText}
  text="Be among the first to try Prometera BuyBox Sentinel and get early access to the tool." 
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