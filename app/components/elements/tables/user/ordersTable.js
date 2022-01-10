import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import dayjs from "dayjs";
import Table from "../../../../../app/components/elements/tables/tableInstance/table";
import FriendlyID from "../../../../../app/components/modules/friendlyID";
import OrderDetailsToggleModalButton from "../../../../../app/components/elements/buttons/store/orders/toggleOrderDetailsModalButton";
import PayForOrderButton from "../../../../../app/components/elements/buttons/store/orders/payForOrderButton";
export default function OrdersTableComponent({ items }) {
  const [loadingData, setLoadingData] = useState(true);
  const [orderData, setOrderData] = useState(items);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let render = [];

    orderData.forEach((item, index) => {
      render[index] = {
        id: <FriendlyID ID={item._id} />,
        addDate: dayjs(item.createdAt).format("DD-MM-YYYY HH:MM:ss"),
        get status() {
          switch (item.orderStatus) {
            case "NEW":
              return "NOWE ZAMÓWIENIE";
            case "IN_PROGRESS":
              return "W REALIZACJI";
            case "FINISHED":
              return "GOTOWE";
          }
          return item.orderStatus;
        },
        itemsLength: item.products.length,
        value: item.totalValue.toFixed(2),
        buttons: (
          <div className="d-flex gap-2">
            <OrderDetailsToggleModalButton orderData={item} />
            {["NEW", "NOT-PAID"].includes(item.orderStatus) && (
              <PayForOrderButton orderId={item._id} />
            )}
          </div>
        ),
      };
    });
    setTableData(render);
    setLoadingData(false);
  }, [items]);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID zam.",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Data złożenia",
        accessor: "addDate",
      },
      {
        Header: "Status zamówienia",
        accessor: "status",
      },
      {
        Header: "Ilość produktów",
        accessor: "itemsLength",
      },
      {
        Header: "Wartość",
        accessor: "value",
      },
      {
        Header: "",
        accessor: "buttons",
      },
    ],
    []
  );

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
