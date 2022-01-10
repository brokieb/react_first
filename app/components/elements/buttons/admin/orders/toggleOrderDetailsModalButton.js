import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderDetailsModal from "../../../../../../app/components/elements/modals/admin/orders/orderDetailsModal";

export default function OrderDetailsToggleModalButton({ orderData }) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button
        size="sm"
        variant="primary"
        onClick={() => {
          setModalShow(true);
        }}
      >
        <FontAwesomeIcon icon={faFolderOpen} />
      </Button>
      <OrderDetailsModal
        show={modalShow}
        handleClose={() => {
          setModalShow(false);
        }}
        orderData={orderData}
      ></OrderDetailsModal>
    </>
  );
}
