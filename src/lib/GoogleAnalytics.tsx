'use client';

import { useCookies } from 'next-client-cookies';
import Script from 'next/script';

export const GoogleAnalytics = () => {
  const cookies = useCookies();

  const userType = cookies.get('user_type');

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />

      <Script strategy="lazyOnload">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('set', 'user_properties', {
              "user_type" : ${userType} })
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
              });
          `}
      </Script>
    </>
  );
};
