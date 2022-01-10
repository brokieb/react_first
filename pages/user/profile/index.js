import { useSession, signIn } from "next-auth/react";
import { Image, Button, Card, ListGroup } from "react-bootstrap";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axiosInstance from "app/lib/axiosInstance";
import { getSession } from "next-auth/react";
import dayjs from "dayjs";
import RemoveUserButton from "app/components/elements/buttons/user/removeUserButton";
import Loading from "app/components/layout/loading";
export default function Home(props) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    props.setTitle("Profil");

    axiosInstance({
      url: "api/user/getUser",
      method: "GET",
      data: {
        uid: session.user.uid,
      },
    }).then((user) => {
      setUser(user.data);
      setLoading(false);
    });
  }, []);
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
      <h1 className="text-center">
        Witaj {props.user.name ?? props.user.email}!
      </h1>

      <Row className="w-100 ">
        <Col className="d-flex justify-content-end">
          <Image
            src={props.user.image}
            roundedCircle
            className="square-image"
            style={{ width: "250px", height: "250px" }}
          />
        </Col>
        <Col className="d-flex align-items-center">
          <ul>
            <li>
              Login: <strong>{props.user.name}</strong>
            </li>
            <li>
              Email:{" "}
              <strong>
                {props.user.email ? props.user.email : "Nie podano"}
              </strong>
            </li>
            <li>
              Dołączono:{" "}
              <strong>
                {dayjs(props.user.createdAt).format("DD/MM/YYYY")}
              </strong>
            </li>
            <li>
              Ostatnia aktualizacja:{" "}
              <strong>
                {dayjs(props.user.updatedAt).format("DD/MM/YYYY")}
              </strong>
            </li>
            <li>
              Uprawnienia:{" "}
              <strong>{getPermissionString(props.user.permission)}</strong>
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
