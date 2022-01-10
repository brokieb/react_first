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

export default function RemoveUserPromptModal(props) {
  const [loadingData, setLoadingData] = useState(true);

  const schema = yup
    .object()
    .shape({
      EMAIL: yup
        .string()
        .email("To nie jest prawidłowy adres email")
        .required("To pole jest obowiązkowe"),
    })
    .required();
  return (
    <Modal
      onHide={props.handleClose}
      show={props.show}
      backdrop="static"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Potwierdź usunięcie konta</Modal.Title>
      </Modal.Header>
      <RemoveUserForm>
        <Modal.Body>
          <Alert variant="danger">
            <Alert.Heading>Ta czynność jest nieodwracalna!</Alert.Heading>
            <p>
              Pamiętaj proszę że usunięcia konta nie da się cofnąć. Robiąc to,
              nie będziesz mógł już sprawdzić aktualnych haseł do kont które u
              nas wynająłeś. Nie będzie również możliwości żeby administracja
              podała Ci w przyszłości hasła do konta VOD (jeżeli takie sie
              zmieni) jeżeli nie będziesz zalogowany na tym koncie na którym
              dokonany został zakup.
            </p>
          </Alert>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="danger" type="submit">
            Rozumiem ryzyko, usuń konto
          </Button>
          <Button variant="success" onClick={props.handleClose}>
            Anuluj działanie
          </Button>
        </Modal.Footer>
      </RemoveUserForm>
    </Modal>
  );
}
