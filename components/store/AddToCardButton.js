import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { increment } from '../../features/counter/counterSlice';
import axios from 'axios';
import Router from 'next/router';
export default function AddToCardButton(props) {
	const dispatch = useDispatch();
	function addToCardHandler() {
		axios
			.put('/api/putAddCardProduct', {
				headers: {
					'Content-Type': 'application/json',
				},
				params: {
					productId: props._id,
				},
			})
			.then((res) => {
				if (res.status == '200') {
					const filteredArray = res.data.newCart.cart.items.filter((element) => {
						return element.productId.toString() === props._id;
					});
					if (filteredArray[0].quantity === 1) {
						dispatch(increment());
					}
				} else {
					console.log('blad', res);
				}
			});
	}

	return (
		<Button variant="outline" onClick={addToCardHandler}>
			<FontAwesomeIcon icon={faCartPlus} size="lg" />
		</Button>
	);
}
