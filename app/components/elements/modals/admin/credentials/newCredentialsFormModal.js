import { Modal } from "react-bootstrap";
import NewCredentialsForm from "../../../forms/admin/credentials/newCredentialsForm";

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
