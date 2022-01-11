import { getProviders, signIn } from "next-auth/react";
import LoginForm from "../../../app/components/elements/forms/auth/loginForm";
import { Button, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useEffect } from "react";
import { getCsrfToken } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
export default function SignIn(props) {
  useEffect(() => {
    props.setTitle("Logowanie");
  }, [props]);
  return (
    <Row className="gap-4 justify-content-around">
      <Col xs={12} md={5} xl={3} className="gap-3 d-flex flex-column">
        <LoginForm csrfToken={props.csrfToken} />
        <hr className="mt-0" />
        <Button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="d-flex align-items-center px-0 py-2"
        >
          <FontAwesomeIcon icon={faGoogle} className="mx-2 fs-4" />
          Zaloguj się przez Google
        </Button>
        <Button
          onClick={() => signIn("facebook", { callbackUrl: "/" })}
          className="d-flex align-items-center px-0 py-2"
        >
          <FontAwesomeIcon icon={faFacebook} className="mx-2 fs-4" size="1x" />
          Zaloguj się przez Facebook
        </Button>
        <Link href="/auth/register">
          <Button className="d-flex align-items-center px-0 py-2">
            <FontAwesomeIcon icon={faEnvelope} className="mx-2 fs-4" />
            Załóż konto email
          </Button>
        </Link>
      </Col>
      <Col xs={12} md={6} xl={5}>
        <h2>Konto w PLEJEREK.PL</h2>
        <p>Zakładając konto w naszym serwisie zyskujesz:</p>
        <ul>
          <li>
            Możliwość na bieżąco sprawdzania danych logowania do zakupionego
            konta
          </li>
          <li>Bardzo łatwy i szybki sposób komunikacji z obsługą sklepu</li>
          <li>Zniżki przy kolejnych zakupach</li>
        </ul>
        <hr />
        <p>
          Pamiętaj proszę że twoje dane w naszym serwisie są bezpieczne i w
          każdym momencie możesz usunąć swoje dane, klikając w odpowiedni
          przycisk
        </p>
      </Col>
    </Row>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
