import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import * as yup from "yup";
import axiosInstance from "app/lib/axiosInstance";
import NewCredentialsForm from "app/components/elements/forms/admin/credentials/newCredentialsForm";

export default function NewCredentialsFormModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Dodaj konto</Modal.Title>
      </Modal.Header>
      <NewCredentialsForm />
    </Modal>
  );
}
