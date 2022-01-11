import { Button, Modal, Form, Alert, Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../../app/lib/axiosInstance";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import Loading from "../../../../../app/components/layout/loading";
import * as yup from "yup";
import { Formik } from "formik";
import { createHash } from "crypto";
import queryString from "query-string";
import RemoveUserForm from "../../../../../app/components/elements/forms/user/removeUserForm";

export default function FinishPaymentModal(props) {
  const [loadingData, setLoadingData] = useState(true);
  const [paymentLink, setPaymentLink] = useState("");
  useEffect(() => {
    axiosInstance
      .post("/api/order/postPayment", {
        orderId: props.orderId,
      })
      .then((item) => {
        console.log(item.data.datas);
        setPaymentLink(item.data.link);

        setLoadingData(false);
      })
      .catch((err) => {});
  }, []);
  return (
    <Modal onHide={props.handleClose} show={props.show} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Przygotowanie płatności</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loadingData ? (
          <>ŁADOWANIE...</>
        ) : (
          <>
            <p>
              Link do płatności został wygenerowany, kliknij w poniższy przycisk
              żeby kontynuować
            </p>
            <Button
              variant="success"
              size="lg"
              href={paymentLink}
              target="_blank"
            >
              Przejdź do płatności
            </Button>
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="primary" onClick={props.handleClose}>
          Zamknij
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
