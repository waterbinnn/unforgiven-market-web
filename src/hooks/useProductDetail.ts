import { productManage } from "@/api";
import { useQuery } from "@tanstack/react-query";

const fetchData = async (id: string) => {
  return await productManage.getProductDetail(id);
};

export const useProductDetail = (id: string) => {
  return useQuery(["productDetail", id], () => fetchData(id));
};
