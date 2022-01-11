import { Container, Row, Col } from "react-bootstrap";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Footer() {
  const { data: session } = useSession();
  return (
    <div className="bg-dark pt-5 pb-2 text-light mt-5">
      <Container>
        <Row className="justify-content-around gap-5">
          <Col xs={12} md={5} lg={3} className="text-center">
            <div>
              <h3 className="text-light">Szczegóły</h3>
              <address className="ps-2">
                SKLEP PLEJEREK.PL
                <br />
                Kraków, Polska
                <br />
                help@plejerek.pl
              </address>
            </div>
            <div className="d-flex gap-3 flex-wrap justify-content-around">
              <Link href="/documents/privacy">
                <a href="#">Polityka prywatności</a>
              </Link>
              <Link href="/documents/statute">
                <a href="#">Regulamin strony</a>
              </Link>
            </div>
          </Col>
          <Col xs={12} md={5} lg={3}>
            <h4 className="text-light">Mapa strony</h4>
            <ul className="list-unstyled ps-3 d-flex flex-column gap-2">
              <Link href="/">
                <li>
                  <a href="#">Strona główna</a>
                </li>
              </Link>
              <Link href="/store/products-list">
                <li>
                  <a href="#">Wszystkie produkty</a>
                </li>
              </Link>
              <Link href="/store/cart">
                <li>
                  <a href="#">Mój koszyk</a>
                </li>
              </Link>
              {session ? (
                <>
                  <Link href="/user/profile">
                    <li>
                      <a href="#">Mój profil</a>
                    </li>
                  </Link>
                  <Link href="/user/orders">
                    <li>
                      <a href="#">Moje zamówienia</a>
                    </li>
                  </Link>
                  <Link href="/">
                    <li>
                      <a href="#">Wyloguj się</a>
                    </li>
                  </Link>
                </>
              ) : (
                <Link href="/auth/login">
                  <li>
                    <a href="#">Logowanie</a>
                  </li>
                </Link>
              )}
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="text-muted mt-5 mx-2">
        <p className="m-0">DEV Damian Woźniak</p>
      </div>
    </div>
  );
}
