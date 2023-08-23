"use client";
import classNames from "classnames/bind";
import styles from "./SignUpForm.module.scss";
import CommonStyle from "../../../styles/authStyle.module.scss";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, Input } from "@/components";
import { useState } from "react";

const cx = classNames.bind({ ...styles, ...CommonStyle });

interface Props {
  type: "BUYER" | "SELLER";
}

export const SignUpForm = ({ type }: Props) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const [isError, setIsError] = useState<boolean>(false);
  const [isAgree, setIsAgree] = useState<boolean>(false);

  const handleRouter = (path: string) => {
    router.push(path);
  };

  return (
    <div className={cx("auth-container")}>
      <main className={cx("auth-inner-container")}>
        <h1 className={cx("visually-hidden")}>{type} SIGNUP</h1>

        <form className={cx("auth-wrap")}>
          <h3 className={cx("title", "top")}>{type}</h3>
          <h3 className={cx("title", "bottom")}>SIGNUP</h3>
          <div className={cx("inputs-wrap")}>
            {/* ID */}
            <Input
              placeholder="ID"
              {...register("id")}
              needBtn
              btnText={"Check for the availability"}
            />
            {/* PASSWORD */}
            <Input
              placeholder="PASSWORD"
              type="password"
              {...register("password")}
            />
            {/* VERIFY PASSWORD */}
            <Input
              placeholder="VERIFY PASSWORD"
              type="password"
              needMessage={isError}
              messageText={"비밀번호가 일치하지 않습니다."}
              {...register("verifyPassword")}
            />
            {/* NAME */}
            <Input placeholder="NAME" {...register("name")} />
            {/* Phone Number */}
            <div className={cx("phoneNum-wrap")}>
              <Input
                className={cx("phone-input")}
                {...register("firstNum")}
                defaultValue={"010"}
              />
              <Input className={cx("phone-input")} {...register("middleNum")} />
              <Input className={cx("phone-input")} {...register("lastNum")} />
            </div>
            {/* EMAIL */}
            <Input placeholder="E-MAIL" {...register("email")} />
            {/* 판매자 회원가입 시  */}
            {type === "SELLER" && (
              <>
                {/* Company Registration Number */}
                <Input
                  placeholder="Company Registration Number"
                  {...register("companyRegisterNumber")}
                  needBtn
                  btnText={"certificate"}
                />

                {/* STORE NAME */}
                <Input placeholder="STORE NAME" {...register("storeName")} />
              </>
            )}

            {/* Checkbox */}
            <div className={cx("checkbox-wrap")}>
              <button
                type="button"
                className={cx("checkbox", { active: isAgree })}
                onClick={() => setIsAgree(!isAgree)}
              ></button>
              <label
                className={cx("checkbox-text")}
                htmlFor="agreement"
                onClick={() => setIsAgree(!isAgree)}
              >
                UNFORGIVEN의 이용약관 및 개인정보처리방침에 대한
                <br />
                내용을 확인하였고 동의합니다.
              </label>
            </div>
          </div>

          <div className={cx("btn-wrap")}>
            <Button color="green" size="m" disabled>
              SIGN UP
            </Button>
          </div>
        </form>
        <button
          className={cx("router-btn")}
          type="button"
          onClick={() =>
            handleRouter(type === "BUYER" ? "/signup/seller" : "/signup")
          }
        >
          {type === "BUYER" ? "SELLER" : "BUYER"} SIGNUP
        </button>
      </main>
    </div>
  );
};
