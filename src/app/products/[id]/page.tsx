import { productManage } from "@/api/productManage";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "../products.module.scss";
import { Button } from "@/components";
import CountItem from "../components/CountItem";

const cx = classNames.bind(styles);

export const ProductDetail = async ({ params }: any) => {
  const id = params.id;

  const { data } = await productManage.getProductDetail(id);

  return (
    <main className={cx("container")}>
      <section className={cx("detail-container")}>
        <h2 className={cx("visually-hidden")}>상품상세페이지</h2>
        {data && (
          <>
            <Image
              src={data.image}
              alt={data.product_name}
              width={500}
              height={500}
              placeholder={"blur"}
              blurDataURL={"/assets/default_img.png"}
              className={cx("image")}
            />

            {/* 상품정보 */}
            <div className={cx("detail-data-container")}>
              <div className={cx("detail-info-wrap")}>
                <span className={cx("store")}>{data.store_name}</span>
                <dl className={cx("info-wrap")}>
                  <div className={cx("info-data")}>
                    <dt className={cx("visually-hidden")}>product name</dt>
                    <dd className={cx("info-name")}>{data.product_name}</dd>
                  </div>
                  <div className={cx("info-data")}>
                    <dt className={cx("info-title")}>Price</dt>
                    <dd className={cx("info-price")}>
                      ￦ {data.price.toLocaleString()}
                    </dd>
                  </div>
                </dl>
                <span className={cx("shipping-fee")}>
                  {data.shipping_fee > 0
                    ? `택배배송/${data.shipping_fee.toLocaleString()}원`
                    : "택배배송/무료배송"}
                </span>
              </div>

              {/* 수량 컴포넌트  */}
              <div className={cx("count")}>
                <CountItem stock={data.stock} />
              </div>

              {/* 총 수량  */}
              <div className={cx("total-wrap")}>
                <h3 className={cx("title")}>total</h3>
                <div className={cx("total-num-wrap")}>
                  <span className={cx("data-title")}>Total Item</span>
                  <strong className={cx("data-num")}>{data.stock}</strong>
                </div>
                <strong className={cx("data-fee")}>
                  ￦ {data.price.toLocaleString()}
                </strong>
              </div>

              {/* 버튼 섹션  */}
              <div className={cx("button-wrap")}>
                <Button color="yellow" size="l" width="60%">
                  ORDER
                </Button>
                <Button color="blue" size="l" width="40%">
                  CART
                </Button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default ProductDetail;
