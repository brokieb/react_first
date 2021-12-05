import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderDetailsModal from "app/components/elements/modals/order/orderDetailsModal";

export default function PayForOrderButton() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button
        size="sm"
        variant="success"
        onClick={() => {
          alert("OPŁACAMY TUTAJ ZAMÓWIENIE #########");
        }}
      >
        <FontAwesomeIcon icon={faDollarSign} />
      </Button>
    </>
  );
}
