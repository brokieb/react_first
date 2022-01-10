import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";
import dayjs from "dayjs";
import ToggleCredentialsActiveButton from "../../buttons/admin/credentials/toggleCredentialsActiveButton";
import CredentialsDetailsModalButton from "../../buttons/admin/credentials/toggleCredentialsDetailsModalButton";
import AddMonthHandlerButton from "../../../../../app/components/elements/buttons/admin/credentials/credentialsAddMonthButton";
import Table from "../../../../../app/components/elements/tables/tableInstance/table";
import ActualSlotsInUse from "../../../../../app/components/common/credentialsTableElements/actualSlotsInUse";
import AccountExpiredIn from "../../../../../app/components/common/credentialsTableElements/accountExpiredIn";
import CopyString from "../../../../../app/components/modules/copyString";
import FriendlyID from "../../../../../app/components/modules/friendlyID";

export const CredentialsDataContext = createContext({
  credentialsData: [],
  setCredentialsData: () => {},
});

export default function CredentialsTableContent({ items }) {
  const [loadingData, setLoadingData] = useState(true);
  const [credsData, setCredsData] = useState([]);

  const [credentialsData, setCredentialsData] = useState(items);
  const data = useMemo(
    () => ({ credentialsData, setCredentialsData }),
    [credentialsData]
  );

  useEffect(() => {
    let render = [];

    items.forEach((item, index) => {
      render[index] = {
        id: <FriendlyID ID={item._id} />,
        email: (
          <>
            {item.email}
            <CopyString string={item.email} />
          </>
        ),
        password: (
          <>
            {item.password}
            <CopyString string={item.password} />
          </>
        ),
        SKU: item.productId.SKU,
        comment: item.comment,
        expiredIn: (
          <>
            <AccountExpiredIn date={item.expiredIn} />
          </>
        ),
        users: (
          <div className="d-flex justify-content-around">
            <ActualSlotsInUse
              maxUsers={item.usersMaxLen}
              nowUsers={item.usersLen}
            />
          </div>
        ),
        buttons: (
          <div className="d-flex justify-content-around">
            <ToggleCredentialsActiveButton credId={item._id} />
            <CredentialsDetailsModalButton credId={item._id} />
            <AddMonthHandlerButton credId={item._id} />
          </div>
        ),
      };
    });
    setCredsData(render);
    setLoadingData(false);
  }, [items, credentialsData]);

  const columns = useMemo(() => [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Hasło",
      accessor: "password",
    },
    {
      Header: "Symbol",
      accessor: "SKU",
      hidden: true,
    },
    {
      Header: "Aktywne do",
      accessor: "expiredIn",
    },
    {
      Header: "Komentarz",
      accessor: "comment",
    },
    {
      Header: "uzytkownicy",
      accessor: "users",
    },
    {
      Header: "Komentarz",
      accessor: "buttons",
    },
  ]);

  return (
    <>
      {loadingData ? (
        <p>Ładowanie tabeli...</p>
      ) : (
        <CredentialsDataContext.Provider value={data}>
          <Table columns={columns} data={credsData} />
        </CredentialsDataContext.Provider>
      )}
    </>
  );
}
