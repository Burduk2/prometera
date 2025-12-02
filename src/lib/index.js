import { writable } from "svelte/store";

export const TITLE = 'Prometera – Data Collection & Automation for Businesses';
export const DESC = 'Custom-built data collection that gives your business the information it needs without the manual work.';
export const DOMAIN = 'prometera.com';
export const EMAIL = 'contact@prometera.com';
export const NAME = 'Prometera';
export const GSHEETS_ADS = 'https://docs.google.com/spreadsheets/d/1P_D7cK3EjivsLn2PoUaW9drW1ik0gxxoGgCOInIyg5Y/edit?gid=1387262382#gid=1387262382';
export const GSHEETS_PARTNERS = 'https://docs.google.com/spreadsheets/d/1P_D7cK3EjivsLn2PoUaW9drW1ik0gxxoGgCOInIyg5Y/edit?gid=1867109596#gid=1867109596';

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
export function toggleModal(name, visible) {
  activeModal.set(visible ? name : null);
  if (visible) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
}


export async function submitEmailForm(email, form, actionType, data) {
  const routes = {
    'quiz_complete': 'write-analytics',
    'subscribe': 'submit-email',
    'contact_submit': 'write-analytics',
    'sample_access': 'write-analytics',
  }

  let message, isMessageErr, success;
  try {
    const response = await fetch(`/api/${routes[actionType]}`, {
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
      form.reset();
      if (actionType === 'subscribe') {
        message = 'Thank you for subscribing!';
      } else if (actionType === 'contact_submit') {
        message = `Thanks for reaching out! We’ll analyze your data needs and email you a clear plan with next steps within one business day.`;
      }
      success = true;
    }
  } catch (e) {
    message = "Something went wrong. Please try again.";
  }

  const style = !isMessageErr ? 'green-500' : 'red-400';
  form.querySelector('.message').style.color = `var(--color-${style})`;
  form.querySelector('.message').innerText = message || '';

  return success;
}
