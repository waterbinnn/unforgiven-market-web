import { Button } from "@/components";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const SignInButton = () => {
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <>
      {session ? (
        <Button color="green" type="button" onClick={() => signOut()}>
          LOGOUT
        </Button>
      ) : (
        <Button
          color="green"
          type="button"
          onClick={() => router.push("/signin")}
        >
          LOGIN
        </Button>
      )}
    </>
  );
};
