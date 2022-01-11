import { useSession, signIn } from "next-auth/react";
import { Image, Button, Card, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { getSession } from "next-auth/react";
import dayjs from "dayjs";
import axiosInstance from "../../../app/lib/axiosInstance";
import RemoveUserButton from "../../../app/components/elements/buttons/user/removeUserButton";
import Loading from "../../../app/components/layout/loading";
export default function Home(props) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    props.setTitle("Profil");
    if (session) {
      axiosInstance({
        url: "/api/user/getUser",
        method: "GET",
      }).then((user) => {
        setUser(user.data);
        setLoading(false);
      });
    }
  }, [session]);
  function getPermissionString(perm) {
    switch (perm) {
      case 2:
        return "Administrator";
      case 1:
        return "Moderator";
      case 0:
        return "Klient";
    }
  }
  return loading ? (
    <Loading />
  ) : (
    <div className="w-100 d-flex gap-5 flex-column">
      <h1 className="text-center">Witaj {user.name ?? user.email}!</h1>

      <Row className="w-100 ">
        <Col className="d-flex justify-content-end">
          <Image
            src={user.image}
            roundedCircle
            className="square-image"
            style={{ width: "200px", height: "200px" }}
          />
        </Col>
        <Col className="d-flex align-items-center">
          <ul>
            <li>
              Login: <strong>{user.name}</strong>
            </li>
            <li>
              Email: <strong>{user.email ? user.email : "Nie podano"}</strong>
            </li>
            <li>
              Dołączono:{" "}
              <strong>{dayjs(user.createdAt).format("DD/MM/YYYY")}</strong>
            </li>
            <li>
              Ostatnia aktualizacja:{" "}
              <strong>{dayjs(user.updatedAt).format("DD/MM/YYYY")}</strong>
            </li>
            <li>
              Uprawnienia:{" "}
              <strong>{getPermissionString(user.permission)}</strong>
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center gap-3">
          {/* <Button variant="success">Uzupełnij dane</Button> */}
          <RemoveUserButton />
        </Col>
      </Row>
    </div>
  );
}
