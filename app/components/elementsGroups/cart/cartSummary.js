import CartItemsTable from "app/components/elements/tables/store/cartItemsTable";
import CreateOrderForm from "app/components/elements/forms/store/cart/createOrderForm";
import { Button, Form, Alert } from "react-bootstrap";
import DiscountCodeForm from "app/components/elements/forms/admin/discounts/discountCodeCheck";
import Link from "next/link";
import { useState } from "react";
export default function cartSummary({ cartData }) {
  function CartValue() {
    let sum = 0;

    for (const arg of cartData.cart.items) {
      sum += arg.productId.price * arg.quantity;
    }
    let discSum = 0;
    if (cartData.discount) {
      switch (cartData.discount.discountType) {
        case "PERCENT":
          discSum = sum / (cartData.discount.discountValue / 100 + 1);
          break;
        case "AMOUNT":
          discSum = sum - cartData.discount.discountValue;
          break;
      }
    }

    return {
      old: sum.toFixed(2),
      new: (discSum == 0 ? sum : discSum).toFixed(2),
    };
  }

  return (
    <div>
      {!cartData ? (
        <p>Koszyk nie został jeszcze utworzony</p>
      ) : cartData.cart.items.length == 0 ? (
        <p>Twój koszyk jest pusty :)</p>
      ) : (
        <div className="d-flex flex-column gap-2">
          <CartItemsTable />

          <div>
            Pełna wartość zamówienia{" "}
            {cartData.discount && (
              <s className="text-danger">{CartValue().old}</s>
            )}{" "}
            <strong className="text-success">{CartValue().new}</strong>
          </div>
          <div>
            <DiscountCodeForm cart={cartData} />
          </div>
          <div>
            <i>
              Po dokonaniu płatności, dane do logowania zostaną automatycznie
              wysłane na adres email podany przy rejestracji lub jeżeli taki
              adres nie został podany twoje aktualne subskrypcje będą widoczne w
              zakładce <Link href="/user/orders">ZAMÓWIENIA</Link> na twoim
              profilu.
            </i>
          </div>
          <div>
            <CreateOrderForm />
          </div>
        </div>
      )}
      {}
    </div>
  );
}
