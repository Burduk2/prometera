<script>
  import Nav from '$lib/components/Nav.svelte';
  import line1Img from '$lib/assets/vector-line1.svg';
  import { onMount } from 'svelte';
  import { DOMAIN, submitAction, toggleModal } from '$lib';
  import Modal from '$lib/components/Modal.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import EmailForm from '$lib/components/EmailForm.svelte';
  import { fade } from 'svelte/transition';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import ogImg from '$lib/assets/og-image.png';
  import HeroImg from '$lib/assets/landing/hero.png';

  const templates = {
    title: {
      a: '24 Hot Leads<br><span class="gradient-text font-main!">with CRO Gaps</span><br> in 24h',
      a_raw: '24 Hot Leads with CRO Gaps in 24h'
    },
    subtitle: {
      a: 'Leads ready for CRO projects. Delivered to your inbox in just 24 hours.',
      b: 'Prospects ready to book CRO projects. Delivered to your inbox in just 24 hours.'
    },
    cta: {
      a: 'Claim My 24 Leads',
      a1: 'Claim My 24 Leads Now',
    },
    image: {},
    modal_title: {
      a: 'Get Your 24 Hot Leads in 24h',
    },
    modal_subtitle: {
      a: 'Answer a few short questions so we can source the right prospects.',
      b: 'Complete the questionnaire so we can deliver highly-qualified CRO leads straight to your inbox.',
    }
  }

  const titleId = 'a';
  const subtitleId = 'b';
  const ctaId = 'a';
  const imageId = 'a';
  const contentId = 'a';
  const modalTitleId = 'a';
  const modalSubtitleId = 'a';

  const TITLE = templates.title[titleId];
  const META_TITLE = templates.title[titleId + '_raw'] + ' | Prometera';
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

  submitAction('', null, 'landing_page_enter', '');
</script>
<svelte:head>
  <title>{META_TITLE}</title>
  <meta name="description" content={SUBTITLE}>

  <meta property="og:title" content={META_TITLE}>
  <meta property="og:description" content={SUBTITLE}>
  <meta property="og:url" content="https://{DOMAIN}/leads">
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
    <p class="not-md:text-center max-w-none!">{SUBTITLE}</p>
    <button class="brand-btn mt-6 block md:w-fit not-md:w-full" on:click={() => toggleModal('contact', true)}>
      {CTA} <i class="fa-solid fa-arrow-right"></i>
    </button>
  </div>
  <div class="flex justify-center not-md:w-full rounded-xl">
    <img src={HeroImg} alt={SUBTITLE} class="w-[400px] max-w-full" style="box-shadow: 0 0 30px 20px #fff">
  </div>
</section>

<!-- content -->
<section class="layout-wrapper not-md:pt-30 pt-20">
{#if contentId === 'a'}
  <h1 class="sect-title">Leads That Convert Into CRO Projects</h1>
  <p>
    CRO agencies waste hours chasing unqualified leads. Prospecting is slow 
    and rarely produces clients with real CRO opportunities. We fix that — fast.
  </p>
  <div class="gap-5 mt-8 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
    {#each [
      {
        title: 'Stop wasting time',
        text: 'No more irrelevant prospects.',
        cta: 'Get relevant prospects',
        icon: 'fa-solid fa-business-time'
      }, {
        title: 'Focus on strategy',
        text: 'We do the research, verification, and enrichment.',
        cta: '',
        icon: 'far fa-circle-dot'
      }, {
        title: 'Get real opportunities',
        text: 'Every lead has a real CRO gap you can optimize.',
        cta: '',
        icon: 'fa-solid fa-arrows-down-to-people'
      }
    ] as item}
      <div class="brand-box p-7 flex flex-col justify-between">
        <div>
          <i class="{item.icon} text-accent-main! text-3xl! mb-5 brightness-90"></i>
          <h5>{item.title}</h5>
          <p class="mt-2">{item.text}</p>
        </div>
        <button on:click={() => toggleModal('contact', true)} class="secondary-btn mt-5">
          Claim My Leads <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    {/each}
  </div>

  <h1 class="sect-title mt-40">Start Outreach Immediately</h1>
  <p>Everything you need to take action right away:</p>
  <div class="flex gap-x-15 gap-y-10 my-10 flex-wrap items-center">
    <div class="flex flex-col gap-y-2">
      {#each [
        { title: '24 niche-specific leads ready to pitch CRO services', }, 
        { title: 'Verified contacts for immediate outreach', }, 
        { title: 'CSV / CRM-ready for seamless integration', },
      ] as item, i}
        <p class="border border-neutral-200 border-l-accent-main bg-neutral-100 p-4 rounded-md">
          <b class="font-medium mr-2">#{i+1}</b>
          {item.title}
        </p>
      {/each}
    </div>
    <div class="flex flex-col gap-y-2 border-l pl-10 border-neutral-200 py-2 h-full">
      {#each [
        { 
          title: 'Priority scoring', 
          text: 'Contact hottest prospects first.',
          icon: 'fas fa-list-ol' 
        }, 
        { 
          title: 'Email & call script templates', 
          text: 'Start contacting immediately.',
          icon: 'fas fa-pen-clip' 
        }
      ] as item, i}
        <fieldset class="border-yellow-500 border-2 bg-neutral-50 p-4 rounded-md shadow-yellow-500/15 group hover:shadow-md">
          <legend class="text-yellow-500! font-medium">Bonus</legend>
          <p class="-mt-2 font-medium">
            <i class="{item.icon} text-yellow-500! mr-2 group-hover:scale-125 transition"></i> 
            {item.title} <i class="fas fa-arrow-right"></i> {item.text}
          </p>
          <!-- <p class="mt-1">{item.text}</p> -->
        </fieldset>
      {/each}
    </div>
  </div>
  <button class="brand-btn" on:click={() => toggleModal('contact', true)}>
    Start Outreach <i class="fa-solid fa-arrow-right"></i>
  </button>

  <h1 class="sect-title mt-40">How It Works</h1>
  <div class="mt-10 flex gap-x-5 sm:items-center flex-wrap gap-y-5 not-sm:flex-col">
    <button class="secondary-btn" on:click={() => toggleModal('contact', true)}>
      Tell us your niche <i class="fa-solid fa-arrow-right"></i>
    </button>
    <p class="font-medium">
      <i class="fa-solid fa-arrow-right mr-2 text-neutral-300!"></i> get leads in 24h
    </p>
    <p class="font-medium">
      <i class="fa-solid fa-arrow-right mr-2 text-neutral-300!"></i> start booking calls
    </p>
  </div>

  <div class="brand-box mt-30 p-8 flex flex-wrap items-center gap-x-5 gap-y-3">
    <button on:click={() => toggleModal('contact', true)} class="brand-btn not-sm:w-full">
      {CTA} <i class="fa-solid fa-arrow-right"></i>
    </button>
    <em>Only <b class="font-semibold text-t-primary!">{BATCHES_LEFT}</b> free batches left this month.</em>
  </div>
{/if}
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
