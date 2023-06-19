export const dynamic = "force-dynamic"; // this is the fix of params

import { Hydrate, dehydrate } from "@tanstack/react-query";
import ProductList from "./products/components/ProductList";
import getQueryClient from "@/utils/getQueryClient";
import ProductPage from "./products/page";

export default async function Home() {
  const queryClient = getQueryClient();
  const dehydrateState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydrateState}>
      <main>
        {/* @ts-expect-error Server Component */}
        <ProductPage />
      </main>
    </Hydrate>
  );
}
