import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuctionDetailsModal from "../../../../../../app/components/elements/modals/admin/auctions/auctionDetailsModal";

export default function AuctionDetails({ auction }) {
  const [modalShow, setModalShow] = useState(false);
  const [initElement, setInitElement] = useState(false);

  return (
    <>
      <Button
        size="sm"
        variant="primary"
        onClick={() => {
          !initElement && setInitElement(true);
          setModalShow(true);
        }}
      >
        <FontAwesomeIcon icon={faFolderOpen} />
      </Button>
      {initElement && (
        <AuctionDetailsModal
          show={modalShow}
          handleClose={() => {
            setModalShow(false);
          }}
          auction={auction}
        />
      )}
    </>
  );
}
