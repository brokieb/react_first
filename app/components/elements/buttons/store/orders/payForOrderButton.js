import React, { useState, useContext, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderDetailsModal from "../../../../../../app/components/elements/modals/order/orderDetailsModal";
import axiosInstance from "../../../../../../app/lib/axiosInstance";
import FinishPaymentModal from "../../../../../../app/components/elements/modals/user/finishPayment";

export default function PayForOrderButton(props) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInitModal, setShowInitModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <Button
        size="sm"
        variant="success"
        disabled={loading}
        onClick={() => {
          setShowInitModal(true);
          setShowModal(true);
        }}
      >
        {loading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          <FontAwesomeIcon icon={faDollarSign} />
        )}
      </Button>
      {showInitModal && (
        <FinishPaymentModal
          handleClose={handleClose}
          show={showModal}
          orderId={props.orderId}
        />
      )}
    </>
  );
}
