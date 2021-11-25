import axiosInstance from 'app/lib/axiosInstance';
import Router from 'next/router';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Button, Form, Alert } from 'react-bootstrap';
import Loading from 'app/components/layout/loading';
import { increment } from 'app/features/counter/counterSlice';
import CartItemsTable from 'app/components/common/store/cartItemsTable';
import FinishOrderModal from 'app/components/elements/modals/order/finishOrderModal';

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [err, setErr] = useState(false);
	const [sumPrice, setSumPrice] = useState(0);
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [showCreateOrderModal, setShowCreateOrderModal] = useState(<></>);
	const [cookies, setCookie] = useCookies(['cart']);
	const { data: session, status } = useSession();
	function getData() {
		axiosInstance
			.get('/api/cart/getCartItems', {
				params: {
					cart: cookies.cartId ? cookies.cartId : null,
				},
			})
			.then((res) => {
				if (res.status == '200') {
					if (res.data.status == 'MERGED_CARTS') {
						setErr(
							'Aktualny koszyk zawiera się z koszyka stworzonego przed zalogowaniem oraz tego dołączonego do twojego konta',
						);
					}

					if (res.data.main) {
						const activeCart = res.data.main.cart;
						if (activeCart) {
							let data = activeCart.items;
							let sum = 0;
							data.forEach((arg, index) => {
								sum += arg.productId.price * arg.quantity;
								arg['value'] = arg.productId.price * arg.quantity;
							});
							setSumPrice(sum);
							setData(data);
						}
					}

					setLoading(false);
				}
			})
			.catch((err) => {
				throw 'Błąd ->' + err;
			});
	}

	useEffect(() => {
		if (loading) {
			getData();
		}
	}, []);

	function handleCreateOrder() {
		axiosInstance
			.post('/api/order/postNewOrder', {})
			.then((res) => {
				setData([]);
				setShowCreateOrderModal(<FinishOrderModal orderId={res.data._id} />);
				//zamówienie utworzone, otwieramy modal do realizacji zamówienia
				Router.push('/user/orders?' + res.data._id);
			})
			.catch((err) => {});
	}

	return (
		<div className="w-50 d-flex flex-column gap-2">
			{err ? (
				<>
					<Alert variant="warning">{err}</Alert>
				</>
			) : (
				<></>
			)}
			{loading ? (
				<Loading></Loading>
			) : data.length == 0 ? (
				<p>Twój koszyk jest pusty :)</p>
			) : (
				<>
					<CartItemsTable data={data} />
					<div>
						Pełna wartość zamówienia : <strong>{sumPrice}</strong>
					</div>
					<div>
						Po dokonaniu płatności, dane do logowania zostaną automatycznie wysłane na adres email
						podany przy rejestracji lub jeżeli taki adres nie został podany twoje aktualne
						subskrypcje będą widoczne w zakładce <Link href="/user/orders">ZAMÓWIENIA</Link> na
						twoim profilu.
					</div>
					<div>
						<div className="mb-3">
							{session ? (
								<Form.Check
									checked={acceptTerms}
									type="checkbox"
									id="accept-terms"
									label={
										acceptTerms
											? 'Regulamin strony został zaakceptowany :)'
											: 'Akceptuję regulamin strony oraz chcę realizować zamówienie'
									}
									onChange={() => {
										if (acceptTerms) {
											setAcceptTerms(false);
										} else {
											setAcceptTerms(true);
										}
									}}
								/>
							) : (
								<Form.Check
									checked={acceptTerms}
									type="checkbox"
									id="accept-terms"
									label={
										acceptTerms
											? 'Regulamin strony został zaakceptowany :)'
											: 'Akceptuję regulamin strony oraz chcę realizować zamówienie'
									}
									onChange={() => {
										if (acceptTerms) {
											setAcceptTerms(false);
										} else {
											setAcceptTerms(true);
										}
									}}
								/>
							)}
						</div>
					</div>
					<div>
						{session ? (
							<>
								{acceptTerms ? (
									<Button
										variant="success"
										onClick={() => {
											handleCreateOrder();
										}}
									>
										Finalizuj zamówienie a
									</Button>
								) : (
									<Button disabled="disabled" variant="success">
										Finalizuj zamówienie
									</Button>
								)}
							</>
						) : (
							<Link href="/auth/login">
								<Button variant="primary">Zaloguj się</Button>
							</Link>
						)}
					</div>
				</>
			)}
			{showCreateOrderModal}
		</div>
	);
}
