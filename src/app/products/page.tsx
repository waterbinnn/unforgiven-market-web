import { ProductListType } from "@/types/productManage";
import classNames from "classnames/bind";
import styles from "./products.module.scss";
import ProductItem from "./components/ProductItem";

const cx = classNames.bind(styles);

interface Props {
  list: ProductListType[];
}

export const ProductList = ({ list }: Props) => {
  return (
    <section className={cx("list-container")}>
      <h2 className={cx("visually-hidden")}>전체상품목록</h2>
      {list.length > 0 &&
        list.map((product: ProductListType) => (
          <ProductItem product={product} />
        ))}
    </section>
  );
};

export default ProductList;
