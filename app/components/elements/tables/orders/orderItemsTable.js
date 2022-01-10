import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";
import dayjs from "dayjs";
import { Button } from "react-bootstrap";
import ToggleCredentialsActiveButton from "/app/components/elements/buttons/admin/credentials/toggleCredentialsActiveButton";
import CredentialsDetailsModalButton from "/app/components/elements/buttons/admin/credentials/toggleCredentialsDetailsModalButton";
import AddMonthHandlerButton from "/app/components/elements/buttons/admin/credentials/credentialsAddMonthButton";
import Table from "/app/components/elements/tables/tableInstance/table";
import ActualSlotsInUse from "/app/components/common/credentialsTableElements/actualSlotsInUse";
import AccountExpiredIn from "/app/components/common/credentialsTableElements/accountExpiredIn";
import CopyString from "/app/components/modules/copyString";
import FriendlyID from "/app/components/modules/friendlyID";
import { faTrash, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToggleOrderDetailsModalButton from "/app/components/elements/buttons/admin/orders/toggleOrderDetailsModalButton";
import axiosInstance from "/app/lib/axiosInstance";
export default function OrderItemsTable({ orderItems, orderId }) {
  const [loadingData, setLoadingData] = useState(true);
  const [orderData, setOrderData] = useState([]);

  useEffect(async () => {
    let render = [];

    await Promise.all(
      orderItems.map(async (orderItems, index) => {
        const matchedProduct = await axiosInstance.get(
          "/api/creds/getCredentials",
          {
            params: {
              productId: orderItems.productId,
              orderId: orderId,
            },
          }
        );
        render[index] = {
          productId: <FriendlyID ID={orderItems.productId} />,
          productTitle: orderItems.productTitle,
          productQty: orderItems.productQty,
          productPrice: orderItems.productPrice,
          productValue: matchedProduct.data[0].email,
          productStatus: orderItems.productStatus,
        };
      })
    );
    setOrderData(render);
    setLoadingData(false);
  }, [orderItems]);

  const columns = useMemo(() => [
    {
      Header: "ID",
      accessor: "productId",
    },
    {
      Header: "Nazwa",
      accessor: "productTitle",
    },
    {
      Header: "Ilość",
      accessor: "productQty",
    },
    {
      Header: "cena",
      accessor: "productPrice",
    },
    {
      Header: "wartość",
      accessor: "productValue",
    },
    {
      Header: "Status",
      accessor: "productStatus",
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
