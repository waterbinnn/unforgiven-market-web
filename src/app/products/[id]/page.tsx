import { productManage } from "@/api/productManage";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "../products.module.scss";

const cx = classNames.bind(styles);

export const ProductDetail = async ({ params }: any) => {
  const id = params.id;

  const { data } = await productManage.getProductDetail(id);

  return (
    <main className={cx("container")}>
      <h1>상품 디테일</h1>
      <section>
        {data && (
          <>
            <Image
              src={data.image}
              alt={data.product_name}
              width={500}
              height={500}
              placeholder={"blur"}
              blurDataURL={"/assets/default_img.png"}
            />
            <h2>{data.product_name}</h2>
          </>
        )}
      </section>
    </main>
  );
};

export default ProductDetail;
