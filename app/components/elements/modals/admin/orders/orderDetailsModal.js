import { useRef, useState, useEffect } from "react";
import { Button, Modal, Form, ListGroup, Tab, Row, Col } from "react-bootstrap";
import FriendlyID from "../../../../../../app/components/modules/friendlyID";
import OrderItemsTable from "../../../../../../app/components/elements/tables/orders/orderItemsTable";
import ChangeOrderStatusForm from "../../../../../../app/components/elements/forms/admin/orders/changeOrderStatusForm";
export default function OrderDetailsModal(props) {
  const orderDetails = props.orderData;
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
            <OrderItemsTable
              orderId={orderDetails._id}
              orderItems={orderDetails.products}
            />
          </Col>
          <Col>
            <div className="d-flex justify-content-around">
              <Button>Opłać</Button>
              <Button>Anuluj</Button>
              <Button>C</Button>
            </div>
            <hr className="m-4" />
            <div>
              <h3>Zmiana statusu</h3>
              <ChangeOrderStatusForm order={orderDetails} />
            </div>
            <hr className="m-4" />
            <h3>Szczegóły</h3>
            <ul>
              <li>
                ID zamówienia: <strong>{orderDetails._id}</strong>
              </li>
              <li>
                ID użytkownika: <strong>{orderDetails.user.userId}</strong>
              </li>
              <li>
                email:{" "}
                <strong>
                  {orderDetails.user.email ? orderDetails.user.email : "brak"}
                </strong>
              </li>
              <li>
                login: <strong>{orderDetails.user.name}</strong>
              </li>
              <li>
                wartość zamówienia: <strong>{orderDetails.totalValue}</strong>
              </li>
              <li>
                Źródło zamówienia: <strong>{orderDetails.orderSource}</strong>
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
        <Button type="submit" variant="success" form="ChangeOrderStatusForm">
          Zapisz
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
