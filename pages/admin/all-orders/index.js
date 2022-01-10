import react, { useEffect, useState, createContext, useMemo } from "react";
import axiosInstance from "../../../app/lib/axiosInstance";
import AllOrdersTable from "../../../app/components/elements/tables/orders/allOrdersTable";
import Loading from "../../../app/components/layout/loading";

export const OrdersContext = createContext({
  Orders: [],
  setOrders: () => {},
});

export default function Home(props) {
  const [orders, setOrders] = useState([]);
  const orderData = useMemo(() => ({ orders, setOrders }), [orders]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.setTitle("[A] - Wszystkie zamówienia");
  }, [props]);

  useEffect(() => {
    axiosInstance.get("/api/order/getAdminOrders").then((ans) => {
      setOrders(ans.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <title>zamówienia</title>
      {loading ? (
        <Loading />
      ) : (
        <OrdersContext.Provider value={orderData}>
          <AllOrdersTable orders={orders} />
        </OrdersContext.Provider>
      )}
    </>
  );
}
