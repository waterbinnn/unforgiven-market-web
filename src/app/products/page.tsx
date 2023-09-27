import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/utils/getQueryClient";
import ProductList from "./components/ProductList";
import { productManage } from "@/api/productManage";

const ProductPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(["productsList"], () =>
    productManage.getProductList()
  );
  const dehydrateState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydrateState}>
      <ProductList />
    </Hydrate>
  );
};

export default ProductPage;
