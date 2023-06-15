"use client";

import { Button } from "@/components";
import { useEffect } from "react";

interface Props {
  error: string;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className={"error-container"}>
      <p>Something went wrong!</p>
      <Button color="yellow" width="300px" onClick={() => reset()}>
        TryAgain
      </Button>
    </div>
  );
}
