import { useSession, signIn } from "next-auth/react";
import { Image, Button, Card, ListGroup } from "react-bootstrap";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axiosInstance from "/app/lib/axiosInstance";
import { getSession } from "next-auth/react";
import dayjs from "dayjs";
import RemoveUserButton from "/app/components/elements/buttons/user/removeUserButton";
export default function Home(props) {
  useEffect(() => {
    props.setTitle("Koszyk");
  }, [props]);

  return <div>ZAŁADOWANEOO!O!O!!O O! !O! O!</div>;
}
