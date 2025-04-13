import { useCallback } from 'react';

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params: {
        event_category?: string;
        event_label?: string;
        value?: number;
        send_to?: string;
        [key: string]: any;
      }
    ) => void;
    dataLayer?: any[];
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
        value: value,
        send_to: 'G-7DNE8CSDP0'
      });
    }
  }, []);

  return { trackEvent };
};