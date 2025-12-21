<script>
  import line1Img from '$lib/assets/vector-line1.svg';
  import line2Img from '$lib/assets/vector-line2.svg';
  import line3Img from '$lib/assets/vector-line3.svg';
  import Footer from '$lib/components/Footer.svelte';
  import Nav from '$lib/components/SimpleNav.svelte';
  import { NAME, EMAIL, DOMAIN, TITLE, DESC } from '$lib/index.js';

</script>
<style>
  h3 + p { margin-top: .5rem }
</style>
<svelte:head>
  <title>Legal | {NAME}</title>
</svelte:head>

<img src="{line1Img}" alt="line" class="w-full absolute top-18 left-0 z-0 select-none opacity-5" draggable="false" />
<Nav />

<section class="layout-wrapper-sm pt-20 z-10 relative" id="privacy">
  <hr class="border-dashed border-neutral-300 mb-10">
  <h1 class="sect-title">Privacy Policy</h1>
  <div class="flex flex-col gap-y-10 mt-7">
    <p>Last updated: Dec 1, 2025</p>
    <div>
      <h3>1. Controller</h3>
      <p>Prometera (“we”, “us”, “our”) operates this website and is responsible for processing your personal data.</p>
    </div>

    <div>
      <h3>2. Data We Collect</h3>
      <p>We may collect and process:</p>
      <ul>
        <li>Email address</li>
        <li>Quiz answers, form inputs, and any information you submit</li>
        <li>Basic technical data automatically sent by your browser (IP address, device type, etc.) — only what is required for normal website operation</li>
        <li>We <strong>do not use cookies</strong> or third-party tracking technologies</li>
      </ul>
    </div>

    <div>
      <h3>3. Purpose of Processing</h3>
      <p>We process your data to:</p>
      <ul>
        <li>Provide quiz results or resources you request</li>
        <li>Communicate with you about your submission</li>
        <li>Send occasional marketing emails related to data, analytics, or Prometera services</li>
        <li>Improve service reliability and security</li>
        <li>Comply with legal obligations</li>
      </ul>
    </div>

    <div>
      <h3>4. Legal Basis</h3>
      <p>Processing is based on:</p>
      <ul>
        <li><strong>Art. 6(1)(b) GDPR</strong> — performing a service you requested</li>
        <li><strong>Art. 6(1)(a) GDPR</strong> — consent (for receiving marketing emails)</li>
        <li><strong>Art. 6(1)(f) GDPR</strong> — legitimate interests such as preventing abuse or ensuring platform reliability</li>
      </ul>
    </div>

    <div>
      <h3>5. Data Retention</h3>
      <p>We keep your data only as long as necessary for the stated purposes or until you request deletion.  
      Email data is stored until you unsubscribe or withdraw consent.</p>
    </div>

    <div>
      <h3>6. Data Sharing</h3>
      <p>We do not sell personal data.  
      Your data may be shared only with service providers such as:</p>
      <ul>
        <li>Email delivery providers</li>
        <li>Hosting and infrastructure services</li>
      </ul>
      <p>All providers follow GDPR requirements.</p>
    </div>

    <div>
      <h3>7. Your Rights</h3>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold</li>
        <li>Request correction or deletion</li>
        <li>Withdraw your consent at any time</li>
        <li>Object to certain types of processing</li>
        <li>Request data portability</li>
      </ul>
      <p>Contact: <strong>{EMAIL}</strong></p>
    </div>

    <div>
      <h3>8. Marketing Emails</h3>
      <p>If you provide your email and opt in, we may send occasional updates about datasets, analytics insights, or Prometera services.  
      You can unsubscribe at any time via the link in each email.</p>
    </div>

    <div>
      <h3>9. Contact</h3>
      <p>For any questions or requests:</p>
      <p><strong>Prometera</strong><br>
      Email: <strong>{EMAIL}</strong></p>
    </div>
  </div>
</section>

<Footer mt={40} />