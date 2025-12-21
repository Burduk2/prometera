import { writable } from "svelte/store";

export const TITLE = 'Prevent Buy Box Loss — Protect Your Revenue — Prometera';
export const DESC = 'Get daily risk signals for your top ASINs so you protect your Buy Box, and prevent revenue loss — all without manual tracking or spreadsheets.';
export const DOMAIN = 'prometera.com';
export const EMAIL = 'artem@prometera.com';
export const NAME = 'Prometera';
export const GSHEETS_ADS = 'https://docs.google.com/spreadsheets/d/1P_D7cK3EjivsLn2PoUaW9drW1ik0gxxoGgCOInIyg5Y/edit?gid=1387262382#gid=1387262382';
export const GSHEETS_PARTNERS = 'https://docs.google.com/spreadsheets/d/1P_D7cK3EjivsLn2PoUaW9drW1ik0gxxoGgCOInIyg5Y/edit?gid=1867109596#gid=1867109596';
export const GSHEETS_STORES = 'https://docs.google.com/spreadsheets/d/1P_D7cK3EjivsLn2PoUaW9drW1ik0gxxoGgCOInIyg5Y/edit?gid=155050562#gid=155050562';
export const DOWNLOAD_URL = '/files/uk_shopify_leads_sample.zip';

export function inView(node, { onEnter, threshold = 0.3 } = {}) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        onEnter(entry);
      }
    },
    {
      threshold: threshold
    }
  );
  observer.observe(node);

  return {
    destroy() {
      observer.unobserve(node);
      observer.disconnect();
    }
  };
}


export let activeModal = writable(null);
export function toggleModal(name) {
  activeModal.set(name ? name : null);
  document.body.classList[name ? 'add' : 'remove']('overflow-hidden');
}


export async function submitAction(email, form, actionType, data) {
  let message, isMessageErr, success;
  try {
    const response = await fetch(`/api/submit-action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'k': import.meta.env.VITE_MY_API_KEY },
      body: JSON.stringify({
        action_type: actionType,
        action_details: data?.action_details,
        dataset_uid: actionType,
        email: email,
        browser: navigator.userAgent,
        os: navigator.platform,
        language: navigator.language,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
          type: window.innerWidth >= window.innerHeight ? 'landscape' : 'portrait',
        },
        referrer: document.referrer,
        timeOnPage: 0, //Math.floor((Date.now() - startTime) / 1000),
      })
    });
    if (!response.ok) {
      message = "Something went wrong. Please try again.";
    } else {
      localStorage.setItem('emailSubmitted', 'true');
      isMessageErr = false;
      if (form) form.reset();
      if (actionType === 'sample_subscribe') {
        message = 'Thank you for subscribing!';
      } else if (actionType === 'contact_submit') {
        message = `Thanks for reaching out! We’ll analyze your data needs and email you a clear plan with next steps within one business day.`;
      }
      success = true;
    }
  } catch (e) {
    message = "Something went wrong. Please try again.";
  }

  if (form) {
    const style = !isMessageErr ? 'green-500' : 'red-400';
    form.querySelector('.message').style.color = `var(--color-${style})`;
    form.querySelector('.message').innerText = message || '';
  }

  return success;
}
