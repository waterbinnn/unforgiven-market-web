"use client";

import { Button } from "@/components";
import { useRouter } from "next/navigation";

interface Props {
  errorMsg: string;
  url: string;
}

export default function Error({ errorMsg, url }: Props) {
  const router = useRouter();

  return (
    <div className={"error-container"}>
      <p>Something went wrong!</p>
      <span>{errorMsg}</span>
      <Button color="yellow" width="300px" onClick={() => router.push(url)}>
        TryAgain
      </Button>
    </div>
  );
}
