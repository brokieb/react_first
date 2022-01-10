import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddDiscountModalForm from "../../../../../../app/components/elements/modals/admin/discount/addDiscountModalForm";
import axios from "axios";
export default function AddDiscountOpenModalFormButton() {
  const [showAddCredentialsModal, setShowAddCredentialsModal] = useState(false);
  const handleCloseAddCredentialsModal = () =>
    setShowAddCredentialsModal(false);
  const handleShowAddCredentialsModal = () => setShowAddCredentialsModal(true);
  return (
    <>
      <Button className="my-2" onClick={handleShowAddCredentialsModal}>
        Dodaj kod
      </Button>
      <AddDiscountModalForm
        show={showAddCredentialsModal}
        handleClose={handleCloseAddCredentialsModal}
      ></AddDiscountModalForm>
    </>
  );
}
