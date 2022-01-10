import { useRef, useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  ListGroup,
  Tab,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import FriendlyID from "../../../../../app/components/modules/friendlyID";
import OrderItemsTable from "../../../../../app/components/elements/tables/orders/orderItemsTable";
export default function OrderDetailsModal(props) {
  const orderDetails = props.orderData;
  function orderStatus(status) {
    switch (status) {
      case "NEW":
        return "Twoje zamówienie zostało zarejestrowane w naszym systemie ale nie zostało jeszcze opłacone";
      case "IN_PROGRESS":
        return "Aktualnie jesteśmy na etapie realizacji twojego zamówienia, bardzo proszę o cierpliwe oczekiwanie ";
      case "FINISHED":
        return "GOTOWE";
      case "PAID":
        return "Zamówienie jest opłacone i do 5 minut nasz system pobierze twoje zamówienie do realizacji";
      case "NOT-PAID":
        return "Został rozpoczęty proces płatności, ale nie otrzymaliśmy jeszcze potwierdzenia twojej płatności. Jeżeli płatność została dokonana a i tak widzisz ten komunikat, proszę o kontakt poprzez chat.";
    }
  }
  return (
    <Modal show={props.show} onHide={props.handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          Szczegóły zamówienia <FriendlyID ID={orderDetails._id} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <OrderItemsTable orderItems={orderDetails.products} />
          </Col>
          <Col>
            <h3>Szczegóły</h3>
            <Alert>{orderStatus(orderDetails.orderStatus)}</Alert>
            <ul>
              <li>
                ID zamówienia: <strong>{orderDetails._id}</strong>
              </li>

              <li>
                wartość zamówienia: <strong>{orderDetails.totalValue}</strong>
              </li>
              <li>
                Status zamówienia: <strong>{orderDetails.orderStatus}</strong>
              </li>
              <li>
                Data złożenia: <strong>{orderDetails.createdAt}</strong>
              </li>
              <li>
                Ostatnia edycja: <strong>{orderDetails.updatedAt}</strong>
              </li>
            </ul>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Zamknij
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
