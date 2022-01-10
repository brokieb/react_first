import React, { useState, useEffect, useMemo, useContext } from "react";
import axiosInstance from "../../../../../app/lib/axiosInstance";
import Table from "../../../../../app/components/elements/tables/tableInstance/table";
import MoveUserToAnotherCredentials from "../../../../../app/components/elements/buttons/admin/credentials/moveUserToAnotherCredentials";
import BanUserFromCredentials from "../../../../../app/components/elements/buttons/admin/credentials/banUserFromCredentials";
import { CredentialsDataContext } from "../../../../../app/components/elements/tables/credentials/credentialsTableContent";
import GetData from "../../../../../app/components/modules/getData";
import FriendlyID from "../../../../../app/components/modules/friendlyID";
import AccountExpiredIn from "../../../../../app/components/common/credentialsTableElements/accountExpiredIn";

export default function ActiveCredentialsUserTable({ credId }) {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);
  const { credentialsData, setCredentialsData } = useContext(
    CredentialsDataContext
  );

  useEffect(() => {
    const ans = GetData(
      credentialsData,
      credId,
      axiosInstance.get("/api/creds/getCredentials", {
        params: {
          _id: credId,
        },
      })
    ).then((items) => {
      let render = [];
      items.users.forEach((item, index) => {
        render[index] = {
          id: <FriendlyID ID={item._id} />,
          status: item.orderId.orderSource,
          expiredIn: <AccountExpiredIn date={item.expiredIn} />,
          emailRender:
            (item.orderId.user.name && "(" + item.orderId.user.name + ") ") +
            (item.orderId.user.email ? item.orderId.user.email : "brak adresu"),
          buttonsRender: (
            <div className="d-flex justify-content-around">
              <MoveUserToAnotherCredentials id={item._id} />
              <BanUserFromCredentials id={item._id} />
            </div>
          ),
        };
      });
      setData(render);
      setLoadingData(false);
    });
  }, [credId, credentialsData]);

  const columns = useMemo(() => [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "status",
      accessor: "status",
    },
    {
      Header: "email",
      accessor: "emailRender",
    },
    {
      Header: "expiredIn",
      accessor: "expiredIn",
    },
    {
      Header: "buttons",
      accessor: "buttonsRender",
    },
  ]);

  return (
    <>
      {loadingData ? (
        <p>Ładowanie tabeli...</p>
      ) : (
        <Table columns={columns} data={data} />
      )}
    </>
  );
}
