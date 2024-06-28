interface Props {
  action: string; //event name
  category: string;
  label: string;
  value: string | number;
  quantity: number;
}
export const googleEvent = (action: string, values: any) => {
  const event = (window as any).gtag('event', action, values);

  return event;
};
