import { Card, Button, ProgressBar, Toast } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FinishOrderModal from "../../modals/order/finishOrderModal";
export default function Home(props) {
  const [modal, setModal] = useState(false);
  const [ShowFinishOrderModal, setShowFinishOrderModal] = useState(false);
  const order = props.order;
  const router = useRouter();

  function genCard() {
    switch (order.orderStatus) {
      case "NEW":
      case "NOT-PAID":
        const Items = order.products.map((item, index) => {
          return (
            <div key={index}>
              <li>{item.productTitle}</li>
              <ul>
                <li>cena: {item.productPrice}</li>
                <li>ilość: {item.productQty}</li>
                <li>wartość: {item.productValue}</li>
              </ul>
            </div>
          );
        });
        return (
          <>
            <ul>{Items}</ul>
            <hr />
            Wartość zamówienia: {order.totalValue.toFixed(2)} zł
            <div className="py-2">
              <Button
                variant="info"
                onClick={() => {
                  setModal(true);
                  setShowFinishOrderModal(true);
                }}
              >
                Opłać
              </Button>
            </div>
          </>
        );
        break;
      case "PAID":
        return (
          <>
            <p>
              Login <strong>{order.login}</strong>
            </p>
            <p>
              hasło <strong>{order.password}</strong>
            </p>
            <small>
              pozostało dni: <strong>{order.title}</strong>
            </small>
            <ProgressBar animated now={order.days_left} />
            <div className="py-2">
              <Button variant="success" className="m-2">
                Przedłuż
              </Button>
              <Button variant="danger" className="m-2">
                Mam problem
              </Button>
            </div>
          </>
        );
        break;
      case "SEND":
        return (
          <>
            <p>
              Login <strong>{order.login}</strong>
            </p>
            <p>
              hasło <strong>{order.password}</strong>
            </p>
            <small>
              pozostało dni: <strong>{order.title}</strong>
            </small>
            <ProgressBar animated now={order.days_left} />
            <div className="py-2">
              <Button variant="success" className="m-2">
                Przedłuż
              </Button>
              <Button variant="danger" className="m-2">
                Mam problem
              </Button>
            </div>
          </>
        );
        break;
    }
  }
  useEffect(() => {
    if (router.query.orderId == order._id) {
      setModal(true);
      setShowFinishOrderModal(true);
    }
  }, []);
  return (
    <Card style={{ width: "100%" }}>
      <Card.Header className="d-flex justify-content-between">
        <strong>{order._id}</strong>
        <small>{order.createdAt}</small>
      </Card.Header>
      <Card.Body>
        {genCard()}
        {modal ? (
          <FinishOrderModal
            show={ShowFinishOrderModal}
            handleClose={() => setShowFinishOrderModal(false)}
            orderId={order._id}
          />
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  );
}
