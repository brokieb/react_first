import { useRef, useState, useEffect } from "react";
import { Button, Modal, Form, ListGroup, Tab, Row, Col } from "react-bootstrap";
import EditProductForm from "/app/components/elements/forms/admin/product/editProductForm";
import DeleteProductButton from "/app/components/elements/buttons/admin/product/deleteProductButton";
import ToggleActiveProduct from "/app/components/elements/buttons/admin/product/toggleActiveProduct";
import DiscountProductForm from "/app/components/elements/forms/admin/product/discountProductForm";
import axiosInstance from "/app/lib/axiosInstance";
export default function Auction(props) {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    axiosInstance.get("/api/allegro/getOffers").then((item) => {
      setOffers(item.data.offers);
    });
  }, []);
  return <>DIS</>;
}
