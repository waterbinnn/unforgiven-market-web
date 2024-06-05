import { GoogleTagManager } from '@next/third-parties/google';

export default function Head() {
  return (
    <>
      <title>UNFORGIVEN | New Market Place</title>
      {process.env.NODE_ENV === 'production' ? (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID as string} />
      ) : null}
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Unforgiven, The Market Place" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href="https://unforgiven.vercel.app/" />
    </>
  );
}
