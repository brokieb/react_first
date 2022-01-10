import React, { useState } from "react";
import { Button } from "react-bootstrap";
import NewCredentialsFormModal from "../../../modals/admin/credentials/newCredentialsFormModal";
import axios from "axios";
export default function AddCredentialsForm() {
  const [showAddCredentialsModal, setShowAddCredentialsModal] = useState(false);
  const handleCloseAddCredentialsModal = () =>
    setShowAddCredentialsModal(false);
  const handleShowAddCredentialsModal = () => setShowAddCredentialsModal(true);

  function addCredentialsHandler(data) {
    axiosInstance
      .post("/api/creds/postNewCredentials", {
        params: {
          email: data.email,
          password: data.password,
          expiredIn: data.expiredIn,
          comment: data.comment,
          active: data.active,
          productId: data.productId,
        },
      })
      .then((res) => {
        if (res.status == "201") {
        } else {
        }
      });
  }
  return (
    <>
      <Button className="my-2" onClick={handleShowAddCredentialsModal}>
        Dodaj konto
      </Button>
      <NewCredentialsFormModal
        onAddCredentials={addCredentialsHandler}
        show={showAddCredentialsModal}
        handleClose={handleCloseAddCredentialsModal}
      ></NewCredentialsFormModal>
    </>
  );
}
