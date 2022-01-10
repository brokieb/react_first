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
import CloneAuction from "../../../../../app/components/elements/buttons/admin/auctions/cloneAuction";
import AuctionDetails from "../../../../../app/components/elements/buttons/admin/auctions/auctionDetails";

export default function AuctionsListTable({ items }) {
  const [loadingData, setLoadingData] = useState(true);
  const [credsData, setCredsData] = useState([]);

  const [credentialsData, setCredentialsData] = useState(items);

  useEffect(() => {
    let render = [];

    items.forEach((item, index) => {
      render[index] = {
        id: (
          <>
            {item.id}
            <CopyString string={item.id} />
          </>
        ),
        name: (
          <>
            {item.name}
            <CopyString string={item.name} />
          </>
        ),
        source: item.source,
        status: item.publication ? (
          <>
            {item.publication.status}
            <CopyString string={item.publication.status} />
          </>
        ) : (
          <>LOCAL DRAFT</>
        ),
        price: item.sellingMode ? item.sellingMode.price.amount : "BRAK",
        buttons: (
          <div className="d-flex justify-content-around">
            <CloneAuction auction={item} />
            <AuctionDetails auction={item} />
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
      Header: "Nazwa",
      accessor: "name",
    },
    {
      Header: "publikacja",
      accessor: "status",
    },
    {
      Header: "source",
      accessor: "source",
    },
    {
      Header: "cena",
      accessor: "price",
    },
    { Header: "buttons", accessor: "buttons" },
  ]);

  return (
    <>
      {loadingData ? (
        <p>Ładowanie tabeli...</p>
      ) : (
        <Table columns={columns} data={credsData} />
      )}
    </>
  );
}
