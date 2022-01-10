import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CredentialsDetailsModal from "../../../../../../app/components/elements/modals/admin/credentials/credentialsDetailsModal";

export default function CredentialsDetailsModalButton({ credId }) {
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
      <CredentialsDetailsModal
        show={modalShow}
        handleClose={() => {
          setModalShow(false);
        }}
        credId={credId}
      ></CredentialsDetailsModal>
    </>
  );
}
