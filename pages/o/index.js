import { useSession, signIn } from "next-auth/react";
import { Image, Button, Card, ListGroup } from "react-bootstrap";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axiosInstance from "app/lib/axiosInstance";
import { getSession } from "next-auth/react";
import dayjs from "dayjs";
import RemoveUserButton from "app/components/elements/buttons/user/removeUserButton";
export default function Home(props) {
  useEffect(() => {
    props.setTitle("Profil");
  }, [props]);

  return (
    <div className="w-100 d-flex gap-5 flex-column">
      <h1 className="text-center">Witaj</h1>
    </div>
  );
}
