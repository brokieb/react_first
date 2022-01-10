import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faMinusCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import axiosInstance from "../../../../../app/lib/axiosInstance";
import { CartDataContext } from "../../../../../pages/store/cart/index";

export default function changeCartSingleItemButton({ mode, id }) {
  const { cartData, setCartData } = useContext(CartDataContext);

  function handleChangeCartItem() {
    axiosInstance
      .put("/api/cart/putChangeCartItems", {
        mode: mode,
        id: id,
      })
      .then((item) => {
        setCartData(item.data.cart);
      });
  }

  switch (mode) {
    case "minus":
      return (
        <Button
          size="sm"
          variant="outline-warning"
          onClick={handleChangeCartItem}
        >
          <FontAwesomeIcon icon={faMinusCircle} />
        </Button>
      );
    case "plus":
      return (
        <Button
          size="sm"
          variant="outline-success"
          onClick={handleChangeCartItem}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </Button>
      );
    case "remove":
      return (
        <Button
          size="sm"
          variant="outline-danger"
          onClick={handleChangeCartItem}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </Button>
      );
  }
}
