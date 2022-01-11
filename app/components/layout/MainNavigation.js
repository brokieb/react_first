import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Dropdown,
  Badge,
  Button,
} from "react-bootstrap";
import UserNavPanel from "./userNavPanel";

function MainNavigation({ expanded, setExpanded }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
      <Container>
        <Link href="/">
          <Navbar.Brand href="/">Plejerek</Navbar.Brand>
        </Link>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => {
            expanded ? setExpanded(false) : setExpanded(true);
          }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" replace>
              <Nav.Link href="/">Strona główna</Nav.Link>
            </Link>
            <Link href="/store/products-list">
              <Nav.Link href="/store/products-list">
                Wszystkie produkty
              </Nav.Link>
            </Link>
          </Nav>
          <div className="d-flex justify-content-between flex-row align-items-center gap-3">
            <UserNavPanel />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
