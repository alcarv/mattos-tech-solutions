import { useCallback } from 'react';

declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params: {
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: any;
      }
    ) => void;
  }
}

export const useGoogleAnalytics = () => {
  const trackEvent = useCallback((
    eventName: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    if (window.gtag) {
      window.gtag('event', eventName, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }, []);

  return { trackEvent };
};