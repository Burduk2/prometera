<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import Marquee from "svelte-fast-marquee";
  import Chart from 'chart.js/auto';
  import { NAME, EMAIL, DOMAIN, TITLE, DESC, inView, GSHEETS, DOWNLOAD_URL } from '$lib/index.js';
  
  import logoImg from '$lib/assets/logo-nobg-500.png';
  import line1Img from '$lib/assets/vector-line1.svg';
  import line2Img from '$lib/assets/vector-line2.svg';
  import line3Img from '$lib/assets/vector-line3.svg';
  import ogImg from '$lib/assets/og-image.png';
  import Footer from '$lib/components/Footer.svelte';
	import { data as previewData, schema as previewSchema, groups as previewGroups, data } from '$lib/assets/datasets/uk-brands/preview.js';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import EmailForm from '$lib/components/EmailForm.svelte';

  let startTime = Date.now();
  let timeOnPage = 0;

  let allPreviewCols = []
  let essentialPreviewCols = ['name', 'category', 'business_phone', 'business_email'];
  const allDataPoints = previewSchema.slice(essentialPreviewCols.length);
  // const dataPoints = [allDataPoints.slice(0, allDataPoints.length / 2), allDataPoints.slice(allDataPoints.length / 2)];
  for (const entry of previewSchema) allPreviewCols.push(entry.display_name);

  const exampleLead = previewData.find(row => row.name === 'Future Past Clothing');

  const marqueeItems = [
    "Save hours on prospecting ⏱️", 
    "Tailor your pitch to each store ✅", 
    "500+ actionable leads ready for outreach 🎯",
  ];
  let benefitCardVisible = false;

  let emailModalVisible = false;
  let emailSubmitted = false;
  let emailForm;
  let emailFormMessage;
  function toggleEmailModal(visible = !emailModalVisible) {
    emailModalVisible = visible;
    if (visible) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }
  async function submitEmailForm(e) {
    const email = e.detail.email;
    const uid = e.detail.uid;
    const form = e.detail.form;

    try {
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'k': import.meta.env.VITE_MY_API_KEY },
        body: JSON.stringify({
          dataset_uid: uid,
          email: email,
          user_data: {
            browser: navigator.userAgent,
            os: navigator.platform,
            language: navigator.language,
            viewport: {
              width: window.innerWidth,
              height: window.innerHeight,
              type: window.innerWidth >= window.innerHeight ? 'landscape' : 'portrait',
            },
            referrer: document.referrer,
            timeOnPage: Math.floor((Date.now() - startTime) / 1000),
          }
        })
      });
      if (!response.ok) {
        emailFormMessage = "Something went wrong. Please try again.";
      } else {
        emailSubmitted = true;
        localStorage.setItem('emailSubmitted', 'true');
        form.reset();
        if (uid === 'subscribe') {
          emailFormMessage = '$Thank you for subscribing!';
        }
      }
    } catch {
      emailFormMessage = "Something went wrong. Please try again.";
    }
  }


  let websiteVisitorsChart, metaAdsChart, productCountChart;

  // Sample data
  const charts = [
    {
      title: "Monthly website visitors",
      chart: websiteVisitorsChart,
      data: {
        "0-1K": 11,
        "1K-10K": 15,
        "10K-100K": 37,
        "100K-1M": 22,
        ">1M": 15 
      }
    },
    {
      title: "Meta Ads per store",
      chart: metaAdsChart,
      data: {
        "1-10": 23,
        "10-100": 49,
        "100-1000": 16,
        ">1000": 5
      }
    },
    {
      title: "Amount of products per store",
      chart: productCountChart,
      data: {
        '1-10': 10,
        '10-100': 21,
        '100-250': 19,
        '>250': 50,
      }
    }
  ];
  const pieChartOptions = {
    responsive: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: { size: 12, weight: 'normal' },
          color: '#374151'
        }
      }
    }
  };
  let sampleTable;
  let sampleTableWidth = 0;
  onMount(() => {
    emailSubmitted = localStorage.getItem('emailSubmitted') == 'true';
    sampleTableWidth = sampleTable.scrollWidth;

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') toggleEmailModal(false);
    });

    for (const chart of charts) {
      new Chart(chart.chart, {
        type: 'pie',
        data: {
          labels: Object.keys(chart.data).map(key => '% ' + key),
          datasets: [{
            data: Object.values(chart.data),
            backgroundColor: ['#d4e66f', '#92c78b', '#3fa28f', '#236a8a', '#033854'],
            borderWidth: 0,
          }]
        },
        options: pieChartOptions
      });
    }
  });
</script>

<svelte:head>
  <title>{TITLE}</title>
  <meta name="description" content={DESC}>
  
  <meta property="og:title" content={TITLE}>
  <meta property="og:description" content={DESC}>
  <meta property="og:url" content="https://{DOMAIN}/">
  <meta property="og:image" content={TITLE}>
  
  <meta name="twitter:title" content={TITLE}>
  <meta name="twitter:description" content={DESC}>
  <meta name="twitter:image" content={ogImg}>
</svelte:head>


<div class="bg-linear-to-b from-[#121212] to-[#0D1A13] min-h-svh">
  <img src="{line1Img}" alt="line" class="w-full absolute top-18 left-0 z-0 select-none opacity-50" draggable="false" />
  <nav class="layout-wrapper pt-8">
    <a href="/" class="flex items-center">
      <h3 class="text-neutral-300! select-none text-p!">{NAME}</h3>
    </a>
  </nav>

  <!-- hero -->
  <div class="layout-wrapper py-5 pt-10 hero-sect flex flex-col justify-center z-10 relative min-h-[90svh]">
    <div class="flex items-center justify-between">
      <div>
        <div class="flex gap-x-4 flex-col items-center">
          <h1 class="text-neutral-100! text-center">
            <!-- 500+ Verified UK Clothing Brand Leads, Active on Meta Ads -->
            Sell to Shopify Stores Already Spending Big—Curated Leads for
            <span class="gradient-text font-main!">Shopify Developers</span>
          </h1>
          <p class="text-neutral-300! text-center">
            Stop wasting hours hunting for high-value Shopify stores. Access a dataset of 500+ 
            active stores, complete with website details, tech stack, social media stats, and 
            revenue opportunity insights.
            <span class="font-medium text-neutral-200! block mt-6">Prioritize the best prospects and close deals faster.</span>
          </p>
          <div class="cta-container flex gap-x-3 gap-y-2 flex-wrap mt-4">
            <a href="#sample" class="brand-btn py-2.5 px-7 hover:border-neutral-800! not-sm:block! not-sm:w-full!">Get a free 10-store sample now</a>
          </div>
        </div>
        <!-- <p class="text-light-secondary! mt-5">* Schedule a free audit call</p> -->
      </div>
      <div>
        <!-- <img src="{ogImg}" alt=""> -->
      </div>
    </div>
  </div>
</div>


<!-- how -->
<div class="relative">
  <img src="{line2Img}" alt="line" class="w-full absolute -top-[300px] left-0 z-0 select-none" draggable="false" />
</div>
<div class="layout-wrapper sm:mt-[120px]! mt-20! relative results-sect">
  <p><i class="fa-solid fa-list mr-2"></i>a structured dataset of</p>
  <h1>500+ verified shopify stores, ready for outreach</h1>
  <div class="flex items-center gap-y-10 mt-12 flex-wrap">
    <div class="flex gap-3 flex-wrap max-w-[600px]">
      {#each [
        { 
          title: 'High-spend stores with development budgets',
          icon : 'fas fa-filter'
        },
        {
          title: "Manually Verified to ensure accuracy",
          icon: "fas fa-check"
        },
        {
          title: "500+ qualified leads",
          text: "Direct, verified contacts ready for outreach.",
          icon: "fas fa-users"
        },
        {
          title: "Updated Monthly",
          text: "Leads are refreshed every month to stay current.",
          icon: "fas fa-calendar-alt"
        },
        {
          title: "Actionable business contacts",
          icon: "fas fa-shield-alt"
        },
        {
          title: "Weak points & upsell angles included",
          icon: "fab fa-square-web-awesome"
        }
      ] as item}
        <div class="bg-accent-main/80 w-50 not-sm:flex-1 not-sm:min-w-[40%] max-w-full py-3 px-5 rounded-md border-2 border-dotted border-white">
          <i class="{item.icon} text-neutral-700! text-xl!"></i>
          <p class="mt-2">{item.title}</p>
        </div>
      {/each}
    </div>
    <div class="w-[540px] max-w-full">
      <p class="rounded-xl bg-bg-main/80 mb-7" style="box-shadow: 0 0 20px 10px #fff">
        Each lead includes website data, social stats, ad activity, and contact info, along with pre-generated 
        <span style="color: {previewGroups.cool} !important" class="font-medium">revenue opportunities</span> 
        highlighting weak points and upsell potential.
        <br><br>
        <!-- Verified and updated monthly, these leads let you skip research and focus on stores most likely to convert. -->
        The leads are verified and updated monthly, to let you skip research and focus on stores that are most likely to convert.
      </p>
      <a href="#sample" class="brand-btn bg-accent-main/80! py-2.5 px-6 not-sm:w-full! not-sm:block">Get a free 10-store sample now</a>
    </div>
  </div>
</div>
<Marquee speed={40} class="mt-15">
  {#each [...marqueeItems, ...marqueeItems, ...marqueeItems] as item}
    <p class="mx-3">{item}</p>
  {/each}
</Marquee>

<section class="layout-wrapper pt-40" id="example">
  <h1 class="sect-title">Turn Data into Deals</h1>
  <div class="flex flex-wrap mt-8 gap-x-20">
    <div class="bg-neutral-100 w-[550px] max-w-full p-5 rounded-lg">
      <p class="font-medium mb-4">Example lead from our dataset</p>
      <div>
        {#each Object.entries(previewGroups) as [groupName, style]}
          <div class="relative pl-3 my-4 flex flex-col gap-px">
            <div class="absolute top-0 left-0 h-full w-1 rounded-full" style="background-color: {style}"></div>
            {#each previewSchema as prop}
              {#if prop.group === groupName}
                <div class="{prop.group !== 'cool' ? 'flex' : ''} gap-3">
                  <Tooltip text={prop.desc}>
                    <p class="text-sm! whitespace-nowrap">
                      <i class="{prop.icon} mr-1 text-xs! text-neutral-400!"></i> {prop.display_name}
                    </p>
                  </Tooltip>
                  <p class="text-sm! font-medium {prop.display_name.includes('desc') ? 'whitespace-nowrap' : ''} overflow-hidden" style="color: {style}">
                    {exampleLead[prop.display_name]}
                  </p>
                </div>
              {/if}
            {/each}
          </div>
        {/each}
        <p class="text-sm! font-medium text-t-primary!">Imagine this 500x.</p>
      </div>
    </div>
    <div class="flex-1 flex flex-col gap-y-10">
      {#each Object.entries({
        'Why this lead matters': [
          '78k+ monthly visitors → clearly an active, scaled store.',
          '1200 running ads → strong ad budget, ideal for dev, CRO, and app upsells.',
          '11k IG followers → large audience / strong social presence.',
          'Full contact data → no hunting for emails or numbers.',
        ],
        'How a Shopify developer could use this': [
          'Use the pre-generated revenue opportunities to tailor your outreach instantly.',
          'Skip hours of research by having leads pre-verified and scored.',
          'Use performance, tech details, and social stats to make each outreach more persuasive.',
          'Identify upsell angles like site speed, conversion optimization, app integrations, and email automation.',
        ]
      }) as [title, items]}
        <div>
          <h4 class="font-medium">{title}</h4>
          <ul class="list-inside mt-2 flex flex-col gap-y-1.5">
            {#each items as item}
              <li class="grid grid-cols-[auto_1fr] gap-x-2">
                <i class="fas fa-check-circle mt-1" style="color: {item.includes('revenue opportunities') ? '#8866eb' : 'var(--color-accent-main)'}"></i>  
                <p>{item}</p>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
      <div>
        <p class="mb-4 font-medium text-t-primary!">This is just one of 500+ verified Shopify stores in the dataset.</p>
        <a href="#sample" class="brand-btn bg-accent-main/90! py-2.5 px-5">Get your free 10-store sample</a>
      </div>
    </div>
  </div>
</section>

<section class="py-12 bg-gray-100 mt-20 shadow-inner shadow-neutral-500/5">
  <div class="layout-wrapper">
    <h1 class="text-2xl mb-8">Insights from the Full Dataset</h1>

    <div class="flex flex-wrap gap-5">
      {#each charts as chart}
        <div class="border rounded-lg p-5 border-neutral-300 w-[370px] not-sm:w-full">
          <p class="font-medium mb-2">{chart.title}</p>
          <div class="my-[-15%]">
            <canvas width="300" bind:this={chart.chart}></canvas>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<section id="sample" class="pt-15 mt-15 overflow-x-scroll layout-wrapper">
  <h1 class="sect-title">Free 10-store sample</h1>
  <p>Preview the full dataset structure with all data points included.
The sample contains 10 complete store entries, so you can data quality before accessing the full 500-store version.</p>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="border border-gray-300 rounded-lg overflow-hidden grid bg-neutral-50 
  border-b overflow-x-hidden w-fit mt-10 max-w-full relative"
  bind:this={sampleTable}
  style="grid-template-columns: repeat({essentialPreviewCols.length + 1}, 13rem);">
  <!-- Header -->   
    {#each essentialPreviewCols as col}
      <div class="px-4 py-2 border-r border-b bg-neutral-100 border-gray-300 text-left font-medium text-sm!">
        {col}
      </div>
    {/each}
    <div class="px-4 py-2 border-l -ml-[0.5px] border-b bg-neutral-100 border-gray-300 text-left sticky right-0">
      <a href="#example" class="font-medium text-sm! underline underline-offset-1">
        → {allPreviewCols.length} total data points...
      </a>
    </div>
    <!-- Body -->
    <!-- <div class="relative"> -->
      <div class="absolute h-full bg-neutral-100/50 top-[41px] left-0 backdrop-blur-[5px] w-full">
        <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-fit">
          <div class="grid grid-cols-[270px_270px] items-center mt-10 not-sm:grid-cols-1 gap-y-5 relative bottom-10">
            {#if !emailSubmitted}
              <div>
                <button on:click={toggleEmailModal}
                class="brand-btn font-secondary! w-full py-3 bg-accent-main/90!">
                  <i class="fa-solid fa-circle-down text-green-800! mr-1"></i>Download ZIP
                </button>
              </div>
              <div class="flex justify-center not-sm:order-3">
                <button class="text-t-primary! cursor-pointer" on:click={toggleEmailModal}>
                  <i class="fa-brands fa-google text-green-800! mr-1"></i>View in Google Sheets
                </button>
              </div>
            {:else}
              <div>
                <a href={DOWNLOAD_URL} download class="brand-btn font-secondary! block py-3 bg-accent-main/90!">
                  <i class="fa-solid fa-circle-down text-green-800! mr-1"></i>Download ZIP
                </a>  
              </div>
              <div class="not-sm:order-3">
                <a href={GSHEETS} target="_blank" class="text-t-primary! block text-center">
                  <i class="fa-brands fa-google text-green-800! mr-1"></i>Open in Google Sheets
                </a>
              </div>
            {/if}
            <p class="text-center text-sm! text-neutral-500! not-sm:order-2 -mt-4">CSV, Excel, JSON</p>
          </div>
        </div>
      </div>
      {#each previewData.slice(0, 10) as row, i}
        {#each essentialPreviewCols as col}
          <div class="px-4 py-2.5 border-r border-gray-300 text-sm!" title="Subscribe to see the complete sample">
            {#if col === 'name' || col === 'category'}
              {row[col]}
            {:else if col === 'business_phone'}
              {row[col].slice(0, 3)}********{row[col].slice(-2)}
            {:else if col === 'business_email'}
              {row[col]?.split('@')[0].toLowerCase()}@***.{row[col]?.split('@')[1]?.split('.').slice(1).join('.')}
            {:else}
              ***
            {/if}
          </div>
        {/each}
        <div class="px-4 py-2.5 border-r border-gray-300 text-sm!">{allPreviewCols.slice(essentialPreviewCols.length).length} more data points...</div>
      {/each}
      <button on:click={toggleEmailModal} class="text-left cursor-pointer hover:underline px-4 py-2.5 text-sm!">See all data...</button>
    <!-- </div> -->
  </div>
</section>

<section class="layout-wrapper pt-30">
  <h1 class="sect-title">🚀 Full Dataset Launching November 30, 2025</h1>
  <p class="mb-10">
    Get early access to the complete UK Shopify dataset with verified contacts, performance insights, and ready-to-use outreach angles.
  </p>
  <div class="max-w-[450px]">
    <p class="font-medium text-t-primary!">
      ⏳ Only 
      <span class="gradient-text">
        {Math.ceil((new Date('2025-11-30') - new Date()) / 1000 / 60 / 60 / 24)} days left! 
      </span>
      Subscribe now to secure your early access and stay ahead of competitors.
    </p>
    <EmailForm uid="subscribe" cta="Subscribe" {emailFormMessage} on:submitAction={submitEmailForm} />
  </div>
</section>

<Footer mt={15} />

{#if emailModalVisible}
<div class="fixed top-0 left-0 w-full h-full bg-black/70 z-50 flex items-center justify-center" 
transition:fade={{duration: 100}}>
  <div class="bg-bg-main w-[450px] max-w-full rounded-lg p-10 overflow-x-hidden relative" 
  transition:fly={{y: 100, duration: 100}}>
    <button on:click={() => toggleEmailModal(false)} title="Close" class="absolute top-4 right-4 cursor-pointer hover:opacity-80">
      <i class="fas fa-xmark text-lg! text-neutral-400!"></i>
    </button>

    {#if !emailSubmitted}
      <!-- <h3>Get your free 10-store sample</h3>
      <p class="mt-3">Instant access. Quality leads.</p>
      <form on:submit|preventDefault={submitEmailForm} class="mt-8" bind:this={emailForm}>
        <input name="email" type="email" autocomplete="email" placeholder="Enter your email"
        class="w-full border-2 border-neutral-300 rounded-md p-2.5" required>
        <button class="brand-btn py-2 px-6 w-full mt-2" type="submit">Get access</button>
      </form>
      {#if emailFormMessage}
        <p class="text-red-400! mt-4 font-medium">{emailFormMessage}</p>
      {/if} -->
      <EmailForm uid="uk_brands_sample" title="Get your free 10-store sample" text="Instant access. Quality leads." 
        cta="Get access" {emailFormMessage} on:submitAction={submitEmailForm} 
      />
    {:else}
      <div transition:fade={{duration: 200}}>
        <h3>Thanks for sharing your email!</h3>
        <p class="mt-3 mb-8">Get your sample below:</p>
        <div>
          <a href="/files/uk_clothing_brands_sample.zip" download
          class="brand-btn font-secondary! block py-3 bg-accent-main/90!">
            <i class="fa-solid fa-circle-down text-green-800! mr-1"></i>Download ZIP
          </a>
          <p class="text-center mt-1 text-sm! text-neutral-500!">CSV, Excel, JSON</p>
        </div>

        <div class="relative flex justify-center my-4">
          <p class="z-10 bg-bg-main relative px-3">or</p>
          <div class="w-screen absolute top-1/2 -translate-y-1/2 bg-neutral-300 h-px"></div>
        </div>

        <div class="flex justify-center">
          <a target="_blank" href={GSHEETS} class="text-t-primary!">
            <i class="fa-brands fa-google text-green-800! mr-1"></i>Open in Google Sheets
          </a>          
        </div>
      </div>
    {/if}
  </div>
</div>
{/if}
