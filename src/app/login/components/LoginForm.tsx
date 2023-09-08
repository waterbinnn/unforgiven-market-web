"use client";

import classNames from "classnames/bind";
import styles from "../../../styles/authStyle.module.scss";
import { Button, Input } from "@/components";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const cx = classNames.bind(styles);

interface Props {
  type: "BUYER" | "SELLER";
}

export const LoginForm = ({ type }: Props) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const [formData, setFormData] = useState([]);

  const [isError, setIsError] = useState<boolean>(false);

  const handleRouter = (path: string) => {
    router.push(path);
  };

  return (
    <div className={cx("auth-container")}>
      <main className={cx("auth-inner-container")}>
        <h1 className={cx("visually-hidden")}>{type} Login</h1>
        <form
          className={cx("auth-wrap")}
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <h3 className={cx("title", "top")}>{type}</h3>
          <h3 className={cx("title", "bottom")}>LOGIN</h3>
          <div className={cx("inputs-wrap")}>
            <Input placeholder="ID" {...register("id")} />
            <Input
              placeholder="PASSWORD"
              type="password"
              needMessage={isError}
              messageText={"아이디 혹은 비밀번호가 일치하지 않습니다."}
              {...register("password")}
            />
          </div>
          <div className={cx("btn-wrap")}>
            <Button color="green" size="m" type="submit">
              LOGIN
            </Button>
            <Button
              color="green"
              size="m"
              onClick={() => handleRouter("/signup")}
            >
              SIGN UP
            </Button>
          </div>
        </form>
        <button
          type="button"
          className={cx("router-btn")}
          onClick={() =>
            handleRouter(type === "BUYER" ? "/login/seller" : "/login")
          }
        >
          {type === "BUYER" ? "SELLER" : "BUYER"} LOGIN
        </button>
      </main>
    </div>
  );
};
