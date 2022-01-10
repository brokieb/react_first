import React, { useState, useContext } from "react";
import axiosInstance from "../../../../../../app/lib/axiosInstance";
import { Button } from "react-bootstrap";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RowDetails } from "../../../../../../app/components/elements/tables/tableInstance/tr";

import AccountExpiredIn from "../../../../../../app/components/common/credentialsTableElements/accountExpiredIn";
import { UnbanUsersContext } from "../../../modals/admin/credentials/credentialsDetailsModal";

export default function UnbanUserFromCredentials(props) {
  const { unbannedUsers, setUnbannedUsers } = useContext(UnbanUsersContext);
  return (
    <Button
      variant={unbannedUsers.includes(props.id) ? "primary" : "secondary"}
      size="sm"
      onClick={() => {
        if (unbannedUsers.includes(props.id)) {
          setUnbannedUsers((prevState) =>
            prevState.filter((el) => {
              return el != props.id;
            })
          );
        } else {
          setUnbannedUsers((prevState) => [...prevState, props.id]);
        }
      }}
    >
      <FontAwesomeIcon icon={faUndo} />
    </Button>
  );
}
