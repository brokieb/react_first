import { Modal } from "react-bootstrap";
import NewDiscountForm from "../../../../../../app/components/elements/forms/admin/discounts/newDiscountForm";
export default function AddDiscountModalForm(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Dodaj kod</Modal.Title>
      </Modal.Header>
      <NewDiscountForm hideModal={props.handleClose} />
    </Modal>
  );
}
