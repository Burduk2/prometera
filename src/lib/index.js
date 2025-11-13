export const TITLE = 'Prometera';
export const DESC = 'Actionable business intelligence for advertisers and agencies';
export const NAME = 'Prometera';
export const EMAIL = 'info@prometera.com';
export const DOMAIN = 'prometera.com';
export const GSHEETS = 'https://docs.google.com/spreadsheets/d/1P_D7cK3EjivsLn2PoUaW9drW1ik0gxxoGgCOInIyg5Y/edit?usp=sharing';

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
