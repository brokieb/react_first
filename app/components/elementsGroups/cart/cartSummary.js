import CartItemsTable from 'app/components/elements/tables/store/cartItemsTable';
import CreateOrderForm from 'app/components/elements/forms/store/cart/createOrderForm';
import { Button, Form, Alert } from 'react-bootstrap';
import DiscountCodeForm from 'app/components/elements/forms/admin/discounts/discountCodeCheck';
import Link from 'next/link';
import { useState } from 'react';
export default function cartSummary({ cartData }) {
	function ShowCartValue() {
		let sum = 0;

		for (const arg of cartData.cart.items) {
			sum += arg.productId.price * arg.quantity;
		}

		if (cartData.discount) {
			let newPrice = 0;
			const discValue = cartData.discount.discountValue;
			switch (cartData.discount.discountType) {
				case 'PERCENT':
					newPrice = sum / (discValue / 100 + 1);
					break;
				case 'AMOUNT':
					newPrice = sum - 0.5;
					break;
			}
			return (
				<>
					Pełna wartość zamówienia :{' '}
					<small className="pe-2">
						<s className="text-danger">{sum}</s>
					</small>
					<strong className="text-success">{Math.round(newPrice * 100) / 100} zł</strong>
				</>
			);
		} else {
			return (
				<>
					Pełna wartość zamówienia : <strong>{Math.round(sum * 100) / 100}</strong>
				</>
			);
		}
	}
	return (
		<div>
			{!cartData ? (
				<p>Koszyk nie został jeszcze utworzony</p>
			) : cartData.cart.items.length == 0 ? (
				<p>Twój koszyk jest pusty :)</p>
			) : (
				<div className="d-flex flex-column gap-2">
					<CartItemsTable items={cartData.cart.items} />
					<div>
						<ShowCartValue />
					</div>
					<div>
						<DiscountCodeForm cart={cartData} />
					</div>
					<div>
						<i>
							Po dokonaniu płatności, dane do logowania zostaną automatycznie wysłane na adres email
							podany przy rejestracji lub jeżeli taki adres nie został podany twoje aktualne
							subskrypcje będą widoczne w zakładce <Link href="/user/orders">ZAMÓWIENIA</Link> na
							twoim profilu.
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
