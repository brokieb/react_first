import OrderHistoryCard from "../../../../app/components/elements/cards/user/orderHistoryCard";

export default function OrderList({ orders }) {
  return orders.map((item, index) => {
    return <OrderHistoryCard key={index} order={item}></OrderHistoryCard>;
  });
}
