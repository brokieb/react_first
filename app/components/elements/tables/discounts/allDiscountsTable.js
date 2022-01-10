import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";
import dayjs from "dayjs";
import ToggleCredentialsActiveButton from "../../../../../app/components/elements/buttons/admin/credentials/toggleCredentialsActiveButton";
import CredentialsDetailsModalButton from "../../../../../app/components/elements/buttons/admin/credentials/toggleCredentialsDetailsModalButton";
import AddMonthHandlerButton from "../../../../../app/components/elements/buttons/admin/credentials/credentialsAddMonthButton";
import Table from "../../../../../app/components/elements/tables/tableInstance/table";
import ActualSlotsInUse from "../../../../../app/components/common/credentialsTableElements/actualSlotsInUse";
import AccountExpiredIn from "../../../../../app/components/common/credentialsTableElements/accountExpiredIn";
import CopyString from "../../../../../app/components/modules/copyString";
import FriendlyID from "../../../../../app/components/modules/friendlyID";
import ToggleOrderDetailsModalButton from "../../../../../app/components/elements/buttons/admin/orders/toggleOrderDetailsModalButton";
export const CredentialsDataContext = createContext({
  credentialsData: [],
  setCredentialsData: () => {},
});

export default function AllDiscountsTable({ discounts }) {
  const [loadingData, setLoadingData] = useState(true);
  const [discountsData, setDiscountsData] = useState(discounts);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    let render = [];
    discountsData.forEach((item, index) => {
      render[index] = {
        id: <FriendlyID ID={item._id} />,
        code: item.code,
        codeQty: item.codeQty,
        value: item.value,
        type: item.type,
        limits: item.limits,
        expiredIn: item.expiredIn,
      };
    });
    setTableData(render);
    setLoadingData(false);
  }, [discounts]);

  const columns = useMemo(() => [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Kod",
      accessor: "code",
    },
    {
      Header: "Ilość",
      accessor: "codeQty",
    },
    {
      Header: "wartość",
      accessor: "value",
    },
    {
      Header: "typ",
      accessor: "type",
    },
    {
      Header: "limity",
      accessor: "limits",
    },
    {
      Header: "do kiedy",
      accessor: "expiredIn",
    },
  ]);

  return (
    <>
      {loadingData ? (
        <p>Ładowanie tabeli...</p>
      ) : (
        <Table columns={columns} data={tableData} />
      )}
    </>
  );
}
