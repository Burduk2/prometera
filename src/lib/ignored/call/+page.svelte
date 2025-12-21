<script>
  import Nav from '$lib/components/SimpleNav.svelte';
  import line1Img from '$lib/assets/vector-line1.svg';
  import { onMount } from 'svelte';
  import { DOMAIN, submitAction, toggleModal } from '$lib';
  import Modal from '$lib/components/Modal.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import EmailForm from '$lib/components/EmailForm.svelte';
  import { fade } from 'svelte/transition';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import ogImg from '$lib/assets/og-image.png';
  import HeroImg1 from '$lib/assets/leadmag-hero.png';

  const templates = {
    title: {
      a: 'Get 1 Discovery Call with a CRO-Interested Lead',
      b: '1 Discovery Call with a CRO-Interested Lead',
    },
    subtitle: {
      a: 'We find a business that fits your ideal client profile and is interested in CRO, book a call with a decision-maker, you only handle the close.',
    },
    cta: {
      a: 'Get the Call Booked Free',
    },
    image: {
      a: HeroImg1,
    },
    modal_title: {
      a: 'll',
    },
    modal_subtitle: {
      a: 'll',
    }
  }

  const titleId = 'a';
  const subtitleId = 'a';
  const ctaId = 'a';
  const imageId = 'a';
  const contentId = 'a';
  const modalTitleId = 'a';
  const modalSubtitleId = 'a';

  const TITLE = templates.title[titleId];
  const META_TITLE = templates.title[titleId + (templates.title[titleId + '_raw'] ? '_raw' : '')]  + ' | Prometera';
  const SUBTITLE = templates.subtitle[subtitleId];
  const CTA = templates.cta[ctaId];
  const IMG = templates.image[imageId];
  const MODAL_TITLE = templates.modal_title[modalTitleId];
  const MODAL_SUBTITLE = templates.modal_subtitle[modalSubtitleId];

  const BATCHES_LEFT = 4;

  let quizData = {};
  let currQuizQ = 0;
  let quizComplete = false;
  const quizQs = [
    {
      id: 'business_type',
      title: 'Your business type',
      subtitle: 'What best describes your business?',
      options: [
        'CRO Agency',
        'Marketing Agency',
        'E-commerce Business',
        'Other B2B business'
      ]
    },
    {
      id: 'leads_niche',
      title: 'Industry / Niche',
      subtitle: 'Which niche should we focus on for leads?',
      options: [
        'Fashion / Apparel',
        'Health / Wellness',
        'Tech / SaaS',
        'Food & Beverage',
        'Other'
      ]
    },
    {
      id: 'leads_company_size',
      title: 'Company size',
      subtitle: 'Approximate number of employees of target companies',
      options: [
        '1-10',
        '11-50',
        '51-200',
        '201-500',
        '500+'
      ]
    },
    {
      id: 'leads_region',
      title: 'Target region',
      subtitle: 'Where should the leads be located?',
      options: [
        'North America',
        'Europe',
        'Asia',
        'Australia',
        'Africa',
        'Other'
      ]
    },
    {
      id: 'goal',
      title: 'Lead goal',
      subtitle: 'What’s the main goal for these leads?',
      options: [
        'Book sales calls',
        'Start CRO projects',
        'Other'
      ]
    },
    {
      id: 'extra_notes',
      title: 'Extra notes (optional)',
      subtitle: 'Any preferences or details to help us find the right leads?',
      textarea: { placeholder: 'Write details...' },
    },
    {
      id: 'email',
      title: 'Write your email',
      subtitle: 'We will deliver the leads to your inbox within 24 hours.',
      email: true,
    }
  ];
  let customAnswerInp;
  let detailsInpValue;

  // submitAction('', null, 'landing_page_enter', '');
</script>
<svelte:head>
  <title>{META_TITLE}</title>
  <meta name="description" content={SUBTITLE}>

  <meta property="og:title" content={META_TITLE}>
  <meta property="og:description" content={SUBTITLE}>
  <meta property="og:url" content="https://{DOMAIN}/call">
  <meta property="og:image" content={ogImg}>
  
  <meta name="twitter:title" content={META_TITLE}>
  <meta name="twitter:description" content={SUBTITLE}>
  <meta name="twitter:image" content={ogImg}>
</svelte:head>

<img src="{line1Img}" alt="line" class="w-full absolute top-18 left-0 z-0 select-none opacity-10" draggable="false" />
<Nav clickable={false} />

<!-- hero -->
<section class="layout-wrapper flex gap-y-20 relative items-center justify-between flex-wrap z-10 min-h-[92svh]">
  <div class="md:w-[450px] not-md:w-full max-w-full">
    <h1 class="not-md:text-center not-md:mt-20">{@html TITLE}</h1>
    <p class="not-md:text-center max-w-none!">{@html SUBTITLE}</p>
    <button class="brand-btn mt-6 block md:w-fit not-md:w-full" on:click={() => toggleModal('contact', true)}>
      {CTA} <i class="fa-solid fa-arrow-right"></i>
    </button>
    <p class="mt-4 text-sm! opacity-70 italic">Attendance may vary; we focus on qualification and booking.</p>
  </div>
  <div class="flex justify-center not-md:w-full rounded-xl">
    <img src={IMG} alt={SUBTITLE} class="w-[350px] max-w-full">
  </div>
</section>

<!-- credibility -->
<section class="layout-wrapper not-md:pt-30 pt-20">
  <h1 class="sect-title">Why It’s Free</h1>
  <p>
    We’re not doing this out of the kindness of our hearts. This free booked call gives you a taste of
    our services, so you can see the value before starting our full paid program.
  </p>
  <div class="flex flex-wrap gap-2 mt-5">
    {#each ['No credit card required', 'No commitment'] as item}
      <p class="bg-accent-main/60 text-t-primary! px-3 py-2 rounded-md font-medium">{item}</p>
    {/each}
  </div>
</section>

<!-- how -->
<section class="layout-wrapper not-md:pt-30 pt-40">
  <h1 class="sect-title">How It Works</h1>
  <div class="gap-5 mt-8 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
    {#each [
      {
        title: 'Find the Right Businesses',
        text: 'We identify companies that match your ideal client profile (ICP)',
        cta: 'Tell us your ICP',
        icon: 'fa-solid fa-arrows-down-to-people'
      }, {
        title: 'Qualify Leads',
        text: 'We make sure they have the budget, decision-making authority, and CRO needs.',
        cta: CTA,
        icon: 'fas fa-check-double'
      }, {
        title: 'Book the Call',
        text: 'A fully qualified discovery call is scheduled directly on your calendar.',
        cta: CTA,
        icon: 'fas fa-calendar-check'
      }
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
    <button on:click={() => toggleModal('contact', true)} class="brand-btn not-sm:py-4! py-3!">
    {CTA} <i class="fa-solid fa-arrow-right"></i>
  </button>
  </div>
</section>

<!-- who -->
<section class="layout-wrapper not-md:mt-30! mt-40! border-t border-b border-neutral-300 py-10">
  <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-10 gap-y-8">
    <h1 class="sect-title">This Is For</h1>
    {#each Object.entries({
      'fas fa-circle-check text-accent-main! brightness-90': [
        'CRO agencies that want sales-ready discovery calls',
        'Teams that clearly know their ICP',
        'Those seeking conversations with engaged decision-makers',
      ],
      'fas fa-circle-xmark text-neutral-800!': [
        'Businesses outside the CRO space',
        'Anyone looking for lead lists, training, or hand-holding',
        'Agencies expecting instant revenue'
      ]
    }) as [icon, items], i}
      <div class="flex flex-col gap-y-3">
        {#each items as item}
          <div class="flex">
            <div class="w-7">
              <i class="{icon}"></i> 
            </div>
            <p class="flex-1">{item}</p>
          </div>
        {/each}
      </div>
    {/each}
    <!-- <p>
        CRO agencies/specialists that want sales-ready discovery calls, not raw leads.
        If you already know your ICP and want conversations with decision-makers ready 
        to invest in CRO, this is for you.
      </p> -->
  </div>
</section>

<!-- why -->
<section class="layout-wrapper not-md:pt-30 pt-40">
  <h1 class="sect-title">What’s in It for You</h1>
</section>

<!-- contact -->
<section class="layout-wrapper not-md:pt-30 pt-20">
  <div class="brand-box mt-30 p-8 flex flex-wrap items-center gap-x-5 gap-y-3">
    <button on:click={() => toggleModal('contact', true)} class="brand-btn not-sm:w-full">
      {CTA} <i class="fa-solid fa-arrow-right"></i>
    </button>
    <em>Only <b class="font-semibold text-t-primary!">{BATCHES_LEFT}</b> free batches left this month.</em>
  </div>
</section>

<Footer mt={40} clickable={false} />

<Modal name="contact" w={550}>
  {#if !quizComplete}
    <h3>{MODAL_TITLE}</h3>
    <p class="mt-2 mb-10">{MODAL_SUBTITLE}</p>
    <div class="w-full h-1 rounded-full bg-neutral-100 mb-10">
      <div class="h-full bg-accent-main rounded-full duration-300" style="width: {currQuizQ / quizQs.length * 100}%"></div>
    </div>
    {#each quizQs as q, i}
      {#if currQuizQ === i}
        <div in:fade={{duration: 200}}>
          <p class="font-medium">{i + 1}. {q.title}</p>
          <p>{q.subtitle}</p>
          {#if q.options}
            <div class="grid gap-2 mt-6 not-sm:grid-cols-1!" style="grid-template-columns: repeat({q.cols || 2}, minmax(0, 1fr))">
              {#each q.options as option}
                <button class="secondary-btn w-auto!" on:click={() => { quizData[q.id] = option; currQuizQ++; }}>{option}</button>
              {/each}
            </div>
            <div class="mt-6">
              <Checkbox label="Custom answer" size="sm">
                <div class="flex items-stretch gap-x-2 mt-2">
                  <input type="text" placeholder="Write answer..." class="flex-1 h-fit" bind:this={customAnswerInp} required>
                  <!-- svelte-ignore a11y_consider_explicit_label -->
                  <button class="secondary-btn block py-0!" on:click={() => {
                    if (customAnswerInp.checkValidity()) {
                      quizData[q.id] = customAnswerInp.value;
                      currQuizQ++;
                    } else {
                      customAnswerInp.reportValidity();
                    }
                  }}>
                    <i class="fas fa-arrow-right"></i>
                  </button>
                </div>
              </Checkbox>
            </div>
          {:else if q.textarea}
            <div class="mt-6 flex gap-x-2 items-stretch">
              <input type="text" placeholder={q.textarea.placeholder} class="flex-1 h-fit" bind:value={detailsInpValue} required>  
              <!-- svelte-ignore a11y_consider_explicit_label -->
              <button class="secondary-btn block py-0!" on:click={() => {
                quizData[q.id] = detailsInpValue;
                currQuizQ++;
              }}><i class="fas fa-arrow-right"></i></button>
            </div>
          {:else if q.email}
            <EmailForm cta="Submit" on:submitAction={async (e) => {
              const ok = await submitAction(e.detail.email, e.detail.form, 'landing_quiz_complete', { 
                action_details: JSON.stringify(quizData)
              });
              if (ok) quizComplete = true;
            }} />
          {/if}
        </div>
        {#if currQuizQ !== 0}
          <button class="mt-6 text-t-primary! font-medium hover:bg-neutral-100 p-3 rounded-md cursor-pointer transition"
          on:click={() => currQuizQ-- }>
            <i class="fas fa-arrow-left text-t-primary!"></i> Back
          </button>
        {/if}
      {/if}
    {/each}
  {:else}
    <h3><i class="fa-solid fa-thumbs-up text-accent-main! brightness-90 text-2xl!"></i> You’re All Set</h3>
    <p class="mt-2">Your answers are submitted. We’re sourcing your 24-lead list.</p>
    <div class="mt-8 flex gap-y-8 flex-col">
      <div>
        <h5>Next Steps</h5>
        <ul class="mt-2">
          <li>Your tailored list is being sourced.</li>
          <li>You’ll receive it by email once ready.</li>
        </ul>
      </div>
      <div>
        <h5>Explore the Full Service</h5>
        <p class="mt-2">
          Interested in ongoing lead sourcing and automation? See our full service
          <a href="/" class="text-accent-main! brightness-90 hover:underline">here.</a>
        </p>
      </div>
    </div>
  {/if}
</Modal>
