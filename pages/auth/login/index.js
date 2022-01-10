import { getProviders, signIn } from "next-auth/react";
import LoginForm from "/app/components/elements/forms/auth/loginForm";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import axiosInstance from "/app/lib/axiosInstance";
import { getCsrfToken } from "next-auth/react";
export default function SignIn(props) {
  useEffect(() => {
    props.setTitle("Logowanie");
  }, [props]);
  return (
    <div>
      <LoginForm csrfToken={props.csrfToken} />
      <Button onClick={() => signIn("github", { callbackUrl: "/" })}>
        Zaloguj się przez Github
      </Button>
      <Link href="/auth/register">
        <Button>Załóż konto email</Button>
      </Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
