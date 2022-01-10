import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MoveUsersContext } from "../../../modals/admin/credentials/credentialsDetailsModal";

export default function BanUserFromCredentials(props) {
  const { movedUsers, setMovedUsers } = useContext(MoveUsersContext);
  return (
    <Button
      variant={movedUsers.includes(props.id) ? "primary" : "secondary"}
      size="sm"
      onClick={() => {
        if (movedUsers.includes(props.id)) {
          setMovedUsers((prevState) =>
            prevState.filter((el) => {
              return el != props.id;
            })
          );
        } else {
          setMovedUsers((prevState) => [...prevState, props.id]);
        }
      }}
    >
      <FontAwesomeIcon icon={faExternalLinkAlt} />
    </Button>
  );
}
