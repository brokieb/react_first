import React, { useState, useContext, useEffect } from "react";
import axiosInstance from "../../../../../../app/lib/axiosInstance";
import { Button } from "react-bootstrap";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CredentialsDataContext } from "../../../../../../app/components/elements/tables/credentials/credentialsTableContent";

import AccountExpiredIn from "../../../../../../app/components/common/credentialsTableElements/accountExpiredIn";
import GetIndex from "../../../../../../app/components/modules/getIndex";
import { produceWithPatches } from "immer";

export default function AddMonthHandlerButton(props) {
  const { credentialsData, setCredentialsData } = useContext(
    CredentialsDataContext
  );
  function addMonthHandler() {
    axiosInstance
      .put("/api/creds/putEditCredentials", {
        params: {
          id: props.credId,
          expiredInAddDays: 30,
        },
      })
      .then((res) => {
        if (res.status == "200") {
          setCredentialsData((item) => {
            return item.map((item, index) => {
              if (item._id == props.credId) {
                item.expiredIn = res.data.data.expiredIn;
              }
              return item;
            });
          });
        } else {
          return false;
        }
      });
  }

  return (
    <Button
      className="btn btn-sm btn-secondary"
      onClick={() => {
        addMonthHandler();
      }}
    >
      <FontAwesomeIcon icon={faCalendarPlus} />
    </Button>
  );
}
