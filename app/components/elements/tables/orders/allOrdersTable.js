import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";
import dayjs from "dayjs";
import Table from "../../../../../app/components/elements/tables/tableInstance/table";
import { OrdersContext } from "../../../../../pages/admin/all-orders";
import CopyString from "../../../../../app/components/modules/copyString";
import FriendlyID from "../../../../../app/components/modules/friendlyID";
import ToggleOrderDetailsModalButton from "../../../../../app/components/elements/buttons/admin/orders/toggleOrderDetailsModalButton";
export default function AllOrdersTable() {
  const [loadingData, setLoadingData] = useState(true);
  const [orderData, setOrderData] = useState([]);
  const { orders, setOrders } = useContext(OrdersContext);
  useEffect(() => {
    let render = [];
    orders.forEach((item, index) => {
      render[index] = {
        id: <FriendlyID ID={item._id} />,
        email: (
          <>
            {item.user.email}
            <CopyString string={item.email} />
          </>
        ),
        name: (
          <>
            {item.user.name}
            <CopyString string={item.name} />
          </>
        ),
        productsCount: item.products.length,
        totalValue: item.totalValue + " zł",
        source: item.orderSource,
        orderStatus: item.orderStatus,
        buttons: (
          <div className="d-flex justify-content-around">
            <ToggleOrderDetailsModalButton orderData={item} />
          </div>
        ),
      };
    });
    setOrderData(render);
    setLoadingData(false);
  }, [orders]);

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
      Header: "Login",
      accessor: "name",
    },
    {
      Header: "Ile prod.",
      accessor: "productsCount",
    },
    {
      Header: "Wart. zam.",
      accessor: "totalValue",
    },
    {
      Header: "Źródło",
      accessor: "source",
    },
    {
      Header: "Status",
      accessor: "orderStatus",
    },
    {
      Header: "Przyciski",
      accessor: "buttons",
    },
  ]);

  return (
    <>
      {loadingData ? (
        <p>Ładowanie tabeli...</p>
      ) : (
        <Table columns={columns} data={orderData} />
      )}
    </>
  );
}
