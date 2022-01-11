import React, { useState, useEffect, useContext } from "react";
import Table from "../../../../../app/components/elements/tables/tableInstance/table";
import ChangeCartSingleItemButton from "../../../../../app/components/elements/buttons/store/changeCartSingleItemButton";
import { CartDataContext } from "../../../../../pages/store/cart/index";
export default function CredentialsTableContent({ items }) {
  const [loadingData, setLoadingData] = useState(true);
  const [tableData, setTableData] = useState([]);
  const { cartData, setCartData } = useContext(CartDataContext);
  useEffect(() => {
    let render = [];
    cartData.cart.items.forEach((item, index) => {
      render[index] = {
        title: item.productId.title,
        quantity: item.quantity,
        price: item.productId.price,
        value: item.productId.price * item.quantity,
        buttons: (
          <div className="d-flex gap-2">
            <ChangeCartSingleItemButton mode="minus" id={item._id} />
            <ChangeCartSingleItemButton mode="remove" id={item._id} />
            <ChangeCartSingleItemButton mode="plus" id={item._id} />
          </div>
        ),
      };
    });
    setTableData(render);
    setLoadingData(false);
  }, [items, cartData]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Produkt",
        accessor: "title", // accessor is the "key" in the data
      },
      {
        Header: "ilość",
        accessor: "quantity",
      },
      {
        Header: "cena",
        accessor: "price",
      },
      {
        Header: "Wartość",
        accessor: "value",
      },
      {
        Header: "przyciski",
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
