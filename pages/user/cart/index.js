import axios from 'axios';
import { increment } from '../../../features/counter/counterSlice';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import CartItemsTable from '../../../components/user/CartItemsTable';
export default function Home() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([{}]);
	const [sumPrice, setSumPrice] = useState(0);

	useEffect(() => {
		function getData() {
			axios
				.get('/api/getCartItems', {
					headers: {
						'Content-Type': 'application/json',
					},
				})
				.then((res) => {
					if (res.status == '200') {
						let data = res.data.cart.items;
						let sum = 0;
						data.forEach((arg, index) => {
							sum += arg.productId.price * arg.quantity;
							arg['value'] = arg.productId.price * arg.quantity;
						});
						setSumPrice(sum);
						setData(data);
						setLoading(false);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
		if (loading) {
			getData();
		}
	}, []);

	function createOrderHandler() {
		console.log('tworzonko');
	}
	return (
		<div className="w-50 d-flex flex-column gap-2">
			{loading ? (
				<p>Ładowanie danych..</p>
			) : (
				<>
					<CartItemsTable data={data} />
					<div>
						Pełna wartość zamówienia : <strong>{sumPrice}</strong>
					</div>
					<div>
						<Link href="/user/create-order">
							<Button variant="success">Finalizuj zamówienie</Button>
						</Link>
					</div>
				</>
			)}
		</div>
	);
}
