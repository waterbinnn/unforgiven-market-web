export const dynamic = "force-dynamic"; // this is the fix of params

import ProductPage from "./products/page";

export default async function Home() {
  return (
    <main>
      {/* @ts-expect-error Server Component */}
      <ProductPage />
    </main>
  );
}
