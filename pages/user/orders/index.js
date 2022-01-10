import OrderHistoryCard from "../../../app/components/elements/cards/user/orderHistoryCard";
import axiosInstance from "../../../app/lib/axiosInstance";
import { Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import Loading from "../../../app/components/layout/loading";
import OrderList from "../../../app/components/elementsGroups/user/orderList";
import OrdersTableComponent from "../../../app/components/elements/tables/user/ordersTable";
Home.title = "Historia zamóień";
export default function Home(props) {
  useEffect(() => {
    props.setTitle("Twoje zamówienia");
  }, [props]);
  const [readyData, setReadyData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const data = await axiosInstance.get("/api/order/getOrders", {
      params: {
        _id: null,
        sort: { createdAt: "asc" },
      },
    });

    setReadyData(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-100">
      <Alert variant="danger">
        <Alert.Heading>Nieopłacone zamówienia</Alert.Heading>
        <p>
          Wszystkie nieopłacone zamówienia będą usuwane po trzech dniach od
          złożenia, jeżeli masz problem z dokonaniem płatności bardzo proszę o
          kontakt na chacie
        </p>
      </Alert>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <OrdersTableComponent items={readyData} />
        </div>
      )}
    </div>
  );
}
