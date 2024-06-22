'use client';

import { useCookies } from 'next-client-cookies';
import Script from 'next/script';

export const GoogleAnalytics = () => {
  const cookies = useCookies();

  const userType = cookies.get('user_type');

  return (
    <>
      <Script
        src={`
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${process.env.NEXT_PUBLIC_GA_TAG});
`}
      ></Script>
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
              "user_type" : {${userType}} })
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
              });
          `}
      </Script>
    </>
  );
};
