import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RemoveUserPromptModal from "../../../../../app/components/elements/modals/user/removeUserPromptModal";
export default function RemoveUserButton() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button
        variant="danger"
        onClick={() => {
          setModalShow(true);
        }}
      >
        Usuń konto
      </Button>
      <RemoveUserPromptModal
        show={modalShow}
        handleClose={() => {
          setModalShow(false);
        }}
      />
    </>
  );
}
