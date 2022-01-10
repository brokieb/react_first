import React, { useState, useContext } from "react";
import axiosInstance from "../../../../../../app/lib/axiosInstance";
import { Button } from "react-bootstrap";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RowDetails } from "../../../../../../app/components/elements/tables/tableInstance/tr";

import AccountExpiredIn from "../../../../../../app/components/common/credentialsTableElements/accountExpiredIn";
import { BanUsersContext } from "../../../modals/admin/credentials/credentialsDetailsModal";

export default function BanUserFromCredentials(props) {
  const { bannedUsers, setBannedUsers } = useContext(BanUsersContext);
  return (
    <Button
      variant={bannedUsers.includes(props.id) ? "primary" : "secondary"}
      size="sm"
      onClick={() => {
        if (bannedUsers.includes(props.id)) {
          setBannedUsers((prevState) =>
            prevState.filter((el) => {
              return el != props.id;
            })
          );
        } else {
          setBannedUsers((prevState) => [...prevState, props.id]);
        }
      }}
    >
      <FontAwesomeIcon icon={faBan} />
    </Button>
  );
}
