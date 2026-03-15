<script>
  import logoImg from '$lib/assets/logo.png';
  import line1Img from '$lib/assets/vector-line1.svg';
  import line2Img from '$lib/assets/vector-line2.svg';
  import line3Img from '$lib/assets/vector-line3.svg';
  import ogImg from '$lib/assets/og-image.png';
  import Footer from '$lib/components/Footer.svelte';
  import { NAME, EMAIL, DOMAIN, TITLE, DESC, toggleModal, activeModal, submitAction, GSHEETS_ADS, GSHEETS_PARTNERS } from '$lib/index.js';
  import { onMount } from 'svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { on } from 'svelte/events';
  import { fade } from 'svelte/transition';
  import EmailForm from '$lib/components/EmailForm.svelte';
  import Nav from '$lib/components/FullNav.svelte';

  onMount(() => {
    const ref = new URLSearchParams(window.location.search)?.get('ref') || '';
    const url = new URL(window.location.href);
    url.searchParams.delete('ref');
    window.history.replaceState({}, '', url);
    if (!ref) return;
    submitAction('', null, 'cold_email_refer', { action_details: ref });
  });

  const targetBusinessTypes = ['CRO Agencies', 'CRO Specialists'];

  const primaryCtaText = 'Get 24 Leads in 24h';
  const secondaryCtaText = 'Book a Demo';

  let heroRotator;
  let heroHlighted = 1;
  onMount(() => {
    let id = 0;
    let currCustomer = targetBusinessTypes[id];
    const animation = [{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(90deg)' }];
    const animatioDuration = 200;
    const animationOptions = { duration: animatioDuration, fill: 'forwards', easing: 'linear' }
    heroRotator.innerText = currCustomer;
    setInterval(async () => {
      id = id === targetBusinessTypes.length - 1 ? 0 : id + 1;
      currCustomer = targetBusinessTypes[id];
      if (heroRotator) {
        heroRotator.animate(animation, animationOptions);
        await new Promise(r => setTimeout(r, animatioDuration));
        heroRotator.innerHTML = window.innerWidth > 400 ? currCustomer : currCustomer.replace(' ', '<br>');
        heroRotator.animate([animation[1], animation[0]], animationOptions);
      }
      heroHlighted = heroHlighted === 1 ? 2 : 1;
    }, 4000);
  });


  let selectedSample = { url: '', title: ''};
  let sampleFormSubmitted;


  let quizResults;
  let quizData = {};
  let currQuizQ = 0;
  const quizQs = [
    {
      id: 'business_type',
      title: 'Your business type',
      subtitle: 'What best describes your business?',
      options: [
        { text: 'Marketing Agency', metrics: ["Ad creatives","Ad spend","Engagement rates","CTR","ROAS","Competitor campaigns","Lead company profiles","Email contacts"] },
        { text: 'E-commerce Business', metrics: ["Product listings","Pricing","SKU details","Promotions","Reviews","Social engagement","Website performance","Ad creatives"] },
        { text: 'Other B2B business', metrics: ["Company name","Website","Industry","Employee count","Supplier/partner offerings","Pricing","Ratings"] },
      ],
    },
    {
      id: 'goal',
      cols: 1,
      title: 'Your primary goal',
      subtitle: 'What’s your main objective with business data?',
      options: [
        { text: 'Identify potential clients / leads', metrics: ["Company name","Website","Email","Phone","Industry","Employee count"] },
        { text: 'Analyze competitors or market trends', metrics: ["Competitor names","Products/services","Pricing","Ad campaigns","Social metrics","Reviews"] },
        { text: 'Improve ad performance or marketing strategy', metrics: ["Ad creatives","Ad spend","Engagement rates","CTR","ROAS","Audience targeting"] },
        { text: 'Research partners / suppliers', metrics: ["Supplier name","Portfolio/offerings","Pricing","Ratings","Location","Contact email"] },
        { text: 'Other', metrics: ["Other metrics — determined during consultation"] },
      ],
    },
    {
      id: 'priority',
      cols: 1,
      title: 'Data Priorities',
      subtitle: 'Which type of data matters most to you?',
      options: [
        { text: 'Contact info & company profiles', metrics: ["Company name","Website","Email","Phone","Industry","Employee count"] },
        { text: 'Social media metrics & engagement', metrics: ["Followers","Engagement rate","Posting frequency","Sentiment","Verified status"] },
        { text: 'Product/service offerings', metrics: ["Product listings","Pricing","SKU details","Promotions","Reviews"] },
        { text: 'Advertising or campaign performance', metrics: ["Ad creatives","Ad spend","Engagement rates","CTR","ROAS","Audience targeting"] },
        { text: 'Other', metrics: ["Other metrics — determined during consultation"] },
      ],
    },
    {
      id: 'freq',
      cols: 2,
      title: 'Frequency / Updates',
      subtitle: 'Do you need ongoing updates or a one-time dataset?',
      options: [
        { text: 'One-time dataset', metrics: [] },
        { text: 'Regular updates', metrics: ["Weekly/Monthly updated performance metrics","Ongoing contact info updates","Ad campaign monitoring","Social engagement tracking"] },
      ],
    },
  ];
  
  function generateQuizResults() {
    const targetProps = new Set();
    for (const props of Object.values(quizData)) props.forEach(prop => targetProps.add(prop));
    return [...targetProps];
  }

  let projectBudget = 1;
  let contactForm;

  onMount(() => document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleModal() }));
</script>

<svelte:head>
  <title>{TITLE}</title>
  <meta name="description" content={DESC}>

  <meta property="og:title" content={TITLE}>
  <meta property="og:description" content={DESC}>
  <meta property="og:url" content="https://{DOMAIN}/">
  <meta property="og:image" content={ogImg}>
  
  <meta name="twitter:title" content={TITLE}>
  <meta name="twitter:description" content={DESC}>
  <meta name="twitter:image" content={ogImg}>
</svelte:head>

<img src="{line1Img}" alt="line" class="w-full absolute top-18 left-0 z-0 select-none opacity-10" draggable="false" />
<Nav />

<!-- hero -->
<div class="layout-wrapper py-5 pt-10 hero-sect flex flex-col justify-center z-10 relative min-h-[90svh]">
  <div class="flex items-center justify-center">
    <div>
      <div class="flex gap-x-4 flex-col items-center">
        <h1 class="text-center hero-title text-t-secondary!">
            <!-- Qualified
            <span class="text-h1! not-sm:text-h1-mobile! font-main! hero-hlight" class:hlighted={heroHlighted === 1}>
              CRO Opportunities
            </span>
            <i class="fa-solid fa-magnifying-glass-chart"></i> -->
            <!-- for -->
            Secure your next high-value CRO project,
            <br>
            without guesswork
          <!-- <span class="block gradient-text font-main! pb-5 text-h1! not-sm:text-h1-mobile! -z-10 relative font-normal!"
          bind:this={heroRotator}></span> -->
        </h1>
        <p class="text-center mt-2!">
          Delivering high-value leads that have CRO gaps you can act on.
        </p>
        <div class="cta-container flex gap-x-3 gap-y-2 flex-wrap mt-8">
          <a href="#quiz" class="brand-btn not-sm:block! not-sm:w-full!">
            {primaryCtaText} <i class="fas fa-arrow-right"></i>
          </a>
          <a href="#contact" class="secondary-btn not-sm:block! not-sm:w-full!">{secondaryCtaText}</a>
        </div>
      </div>
    </div>
    <div>
      <!-- <img src="{ogImg}" alt=""> -->
    </div>
  </div>
</div>


<!-- why -->
<section class="layout-wrapper">
  <h1 class="sect-title">Why Teams Work With Prometera</h1>
  <p>
    Businesses waste hours gathering data manually. We replace that grind with fast,
    accurate, and fully compliant data automation tailored to your workflow.
  </p>
  <div class="gap-5 mt-8 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
    {#each [
      {
        title: 'Public & Compliant Only',
        text: 'We use exclusively publicly available business data — never private or sensitive information.',
        icon: 'fa-solid fa-circle-check',
        cta: { text: 'See Example Datasets', href: '#demos' },
      }, {
        title: 'Custom & Flexible',
        text: 'Data collection tailored to your niche and needs, ready for analysis or system integration.',
        icon: 'fas fa-gears',
        cta: { text: primaryCtaText, href: '#quiz' },
      }, {
        title: 'Satisfaction Guaranteed',
        text: "Didn't find the data useful? You don't pay.",
        icon: 'fas fa-medal',
        cta: { text: secondaryCtaText, href: '#contact' },
      },

    ] as item}
      <div class="brand-box p-7 flex flex-col justify-between">
        <div>
          <i class="{item.icon} text-accent-main! brightness-90 mb-5 text-h3!"></i>
          <p class="font-medium text-h4! text-t-primary!">{item.title}</p>
          <p class="mt-2">{item.text}</p>
        </div>
        <a href={item.cta.href} class="secondary-btn block mt-4">{item.cta.text}</a>
      </div>
    {/each}
  </div>
</section>


<!-- demos -->
<section class="layout-wrapper pt-30" id="demos">
  <h1 class="sect-title">Demos of Past Work</h1>
  <p>See the type of structured business data you’ll get — ready to use for research, marketing, or growth.</p>
  <div class="mt-8 grid grid-cols-2 gap-x-6 not-md:grid-cols-1 gap-y-10">
    {#each [
      {
        title: 'Competitor Ad Activity Insights',
        objective: [
          'Identify e-commerce stores actively running Meta ads',
          'Track product offerings and compare social engagement',
          'Avoid spending hours manually researching online',
        ],
        solution: [
          'Business name, website, and product count',
          'Social metrics (followers, engagement rate, verified status)',
          'Meta ad activity indicators',
          'Tech stack and email provider',
          'Mobile/Desktop performance scores',
          'Company-level contact info',
        ],
        sample_url: GSHEETS_ADS,
        sample_title: 'Meta Advertisers',
        outcome: [
          'Faster research: leads or competitors found in minutes',
          'Tailored to niche and requirements from day one',
          'Reliable, structured, and actionable data',
        ],
      }, {
        title: 'Top Shopify Partners Insights',
        objective: [
          'Discover top-performing Shopify partners and their portfolios',
          'Analyze stats to find the right partner quickly',
          'Save hours of manual partner research',
        ],
        solution: [
          'Partner name and website',
          'Portfolio URL and description',
          'Location and ratings',
          'Pricing and service offerings',
          'Social links',
          'Company-level contact info',
        ],
        sample_url: GSHEETS_PARTNERS,
        sample_title: 'Shopify Partners',
        outcome: [
          'Quickly identify high-quality Shopify partners',
          'Compare portfolios and ratings in one structured view',
          'Save hours of manual research and vetting',
        ],
      },
    ] as demo, i}
      <div class="case-study-card brand-box py-7 flex flex-col gap-y-6 h-fit">
        <div>
          <h3>0{i + 1} / {demo.title}</h3>
        </div>
        <hr>
        <div>
          <h4><i class="fas fa-crosshairs"></i> Client objective</h4>
          {#each demo.objective as objective}<p>{objective}.</p>{/each}
        </div>
        <hr>
        <div>
          <h4><i class="fas fa-check-to-slot"></i> Our solution</h4>
          <p>A structured dataset including:</p>
          <ul>
            {#each demo.solution as solution}<li>{solution}</li>{/each}
          </ul>
          <p>Delivered in CSV, JSON, Excel — ready to use immediately.</p>
          <button class="text-t-primary! cursor-pointer font-medium mt-5 hover:underline underline-offset-2 outline-none" 
          on:click={() => {
            selectedSample.url = demo.sample_url;
            selectedSample.title = demo.sample_title;
            localStorage.getItem('emailSubmitted') == 'true'
              ? window.open(demo.sample_url, '_blank') : toggleModal('sample', true);
          }}>See the Dataset Sample <i class="fas fa-arrow-up-right-from-square text-accent-main! brightness-40"></i></button>
        </div>
        <hr>
        <div>
          <h4><i class="fas fa-arrow-up-right-dots"></i> Client outcome</h4>
          <ul>
            {#each demo.outcome as outcome}<li>{outcome}.</li>{/each}
          </ul>
        </div>
        <hr>
        <div>
          <a href="#quiz" class="brand-btn">{primaryCtaText} <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    {/each}
  </div>
</section>
<Modal name="sample">
  <EmailForm title="Enter your email to access the sample" cta="Access the Sample"
  text="See the kind of high-quality data we can collect for your business" 
  on:submitAction={async (e) => {
    const ok = await submitAction(e.detail.email, e.detail.form, 'sample_access', { action_details: selectedSample.title });
    if (ok) localStorage.setItem('emailSubmitted', 'true');
    toggleModal('sample-thx', true);
  }} />
</Modal>
<Modal name="sample-thx">
 <h3>Thanks!</h3>
  <p class="mt-2">You can now view the dataset sample in Google Sheets.</p>
  <a href={selectedSample.url} target="_blank" class="brand-btn py-2 px-6 block w-fit mt-5">
    See the Sample <i class="fas fa-arrow-up-right-from-square text-accent-main! brightness-40"></i>
  </a>
</Modal>


<!-- how -->
<section class="layout-wrapper pt-40">
  <h1 class="sect-title">How It Works</h1>
  <p>Fast, simple, and tailored to your business needs.</p>
  <div class="mt-10 gap-5 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
    {#each [
      {
        title: 'Share your business focus',
        text: 'Tell us your business focus and we’ll recommend the most valuable metrics to obtain'
      }, {
        title: 'Wait for delivery',
        text: 'We collect, clean, and structure the data — ready within 24–48 hours',
      }, {
        title: 'Use it immediately',
        text: 'Available in CSV/JSON/Excel, ready to integrate into your systems',
      }
    ] as item, i}
      <div class="border-l-2 border-neutral-300 bg-neutral-50 border-dashed p-7 rounded-lg">
        <p class="font-bold text-accent-main! mb-5 brightness-90">0{i + 1}</p>
        <h4 class="">{item.title}</h4>
        <p class="mt-2">{item.text}.</p>
      </div>
      
    {/each}
  </div>
  <p class="mt-8">Optional regular updates available.</p>
</section>


<!-- quiz -->
<div id="quiz"></div>
<section class="layout-wrapper brand-box mt-40! p-10! flex flex-wrap gap-y-15 gap-x-10">
  <div class="max-w-[800px]">
    <h2 class="sect-title">Identify the Data Your Business Needs </h2>
    <p class="mt-2">Answer a few quick questions, and we’ll show exactly which data will help your business grow.</p>
    <button class="brand-btn mt-5 block w-fit"
    on:click={() => toggleModal('quiz', true)}>Take a Quiz <i class="fas fa-arrow-right"></i></button>
  </div>
  <div class="flex justify-center flex-1 items-center">
    <i class="fa-solid fa-square-check text-6xl! text-accent-main! brightness-90"></i>
    <i class="fa-regular fa-square-check text-6xl!"></i>
  </div>
</section>
<Modal name="quiz" w={600}>
  {#if quizQs[currQuizQ]}
    <p class="font-medium text-t-primary! mb-10 text-h4!">
      Complete the quick questionnaire and see which metrics matter most for your growth.
    </p>
    <div class="w-full h-1 rounded-full bg-neutral-100 mb-10">
      <div class="h-full bg-accent-main rounded-full duration-300" style="width: {currQuizQ / quizQs.length * 100}%"></div>
    </div>
    {#each quizQs as q, i}
      {#if currQuizQ === i}
        <div in:fade={{duration: 200}}>
          <p class="font-medium">{i + 1}. {q.title}</p>
          <p>{q.subtitle}</p>
          <div class="grid gap-2 mt-6 not-sm:grid-cols-1!" style="grid-template-columns: repeat({q.cols || 2}, minmax(0, 1fr))">
            {#each q.options as { text, metrics }}
              <button class="secondary-btn w-auto!" on:click={() => { quizData[q.id] = metrics; currQuizQ++; }}>{text}</button>
            {/each}
          </div>
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
    <p class="font-medium text-t-primary! mb-10 text-h4!">
      We’ve identified 
      <span class="text-accent-main! brightness-90 text-h4! font-semibold">{generateQuizResults().length}+</span>
      key data points your business could target.
    </p>
    {#if !quizResults}
      <ol class="list-decimal list-inside mt-4 relative -mb-5">
        {#each generateQuizResults().slice(0, 5) as result}
          <li>{result}</li>
        {/each}
        <div class="absolute w-full h-30 bg-linear-to-t from-white to-transparent bottom-0 z-50"></div>
      </ol>

      <EmailForm cta="See the Full List" on:submitAction={async (e) => {
        const ok = await submitAction(e.detail.email, e.detail.form, 'quiz_complete', {action_details: JSON.stringify(quizData)});
        if (ok) quizResults = generateQuizResults();
      }}/>
    {:else} 
      <ol class="list-decimal list-inside">
        {#each quizResults as prop}
          <li>{prop}</li>
        {/each}
      </ol>

      <button class="brand-btn w-full! mt-5" on:click={() => toggleModal('contact', true) }>
        Get This Data Collected for You <i class="fas fa-arrow-right"></i>
      </button>
    {/if}
  {/if}
</Modal>

<hr class="my-15 border-dashed border-neutral-200">
<!-- contact -->
<section class="layout-wrapper brand-box p-10! flex flex-wrap gap-y-15 gap-x-10" id="contact">
  <div>
    <h2 class="sect-title">Request a Custom Data Project</h2>
    <p class="mt-2">
      Get in touch to discuss your data needs. We will review your use-case, define what can be collected, and outline a clear plan — free and without obligation.
      <br><br>
      You will receive a short consultation, recommended data points, and an estimated timeline.
    </p>
    <button class="brand-btn mt-5" on:click={() => toggleModal('contact', true)}>Request a Project <i class="fas fa-arrow-right"></i></button>
  </div>
  <div class="flex justify-center flex-1 items-center">
    <i class="fa-solid fa-paper-plane text-6xl! border-accent-main border-b-3 rounded-md pb-5"></i>
  </div>
</section>
<Modal name="contact">
  <h3>Start Your Custom Data Project</h3>
  <p class="mt-3">
    Submit your details and we’ll get in touch to discuss your data needs, recommend the best approach, 
    and provide a <b class="font-medium text-t-primary!">free consultation.</b>
  </p>
  <!-- <p>Submit your details and we’ll contact you to plan your data project.</p> -->

  <form on:submit|preventDefault={async () => {
    const ok = await submitAction(contactForm.email.value, contactForm, 'contact_submit', { 
      action_details: Array.from(contactForm.elements)
        .filter(el => el.name)
        .reduce((acc, el) => {
          acc[el.name] = el.value;
          return acc;
        }, {})
    });

  }} class="mt-8 flex flex-col gap-y-5" bind:this={contactForm}>
    <div>
      <label for="name-inp">Name *</label>
      <input id="name-inp" type="text" autocomplete="name" name="name" required>
    </div>
    <div>
      <label for="email-inp">Email *</label>
      <input id="email-inp" type="email" autocomplete="email" name="email" required>
    </div>
    <div>
      <label for="project-type-inp">Project Type *</label>
      <select id="project-type-inp" name="project_type" required>
        <option value="">Select an option</option>
        <option value="lead_generation">Lead generation</option>
        <option value="competitor_research">Competitor research</option>
        <option value="market_analysis">Market analysis</option>
        <option value="ad_performance">Ad performance</option>
        <option value="custom">Custom</option>
      </select>
    </div>
    <div>
      <label for="budget-inp">Budget *</label>
      <div class="flex gap-x-2 items-center input">
        <p class="w-[10ch] font-medium">{['<$200', '$200-$500', '$500-$1500', '>$1500'][projectBudget]}</p>
        <input class="flex-1 p-0!" id="budget-inp" name="budget" type="range" min="0" max="3" step="1" required bind:value={projectBudget}>
      </div>
    </div>
    <div>
      <label for="message-inp">Message (optional)</label>
      <textarea id="message-inp" rows="3" maxlength="1000" name="message"></textarea>
    </div>
    <div>
      <p class="text-sm! opacity-70 mb-2">
        By submitting, you agree to our <a target="_blank" href="/legal#privacy" class="underline text-sm!">Privacy Policy</a>
      </p>
      <button type="submit" class="brand-btn w-full">Start the Project</button>
    </div>
    <p class="font-medium message"></p>
  </form>
</Modal>

<Footer mt={20} />