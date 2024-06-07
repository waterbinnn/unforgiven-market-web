export const useGoogleEvent = () => {
  const event = ({ action, category, label, value }: any) => {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  };

  return { event };
};
