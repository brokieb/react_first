import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { increment } from 'app/features/counter/counterSlice';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function AddToCardButton(props) {
	const dispatch = useDispatch();
	const { data: session, status } = useSession();
	const [cookies, setCookie] = useCookies(['cart']);

	function addToCardHandler() {
		axios
			.put('/api/cart/putAddCardProduct', {
				headers: {
					'Content-Type': 'application/json',
				},
				params: {
					productId: props._id,
					cart: cookies.cartId,
				},
			})
			.then((res) => {
				if (res.status == '200') {
					if (status === 'authenticated') {
						const filteredArray = res.data.newCart.cart.items.filter((element) => {
							return element.productId.toString() === props._id;
						});
						if (filteredArray[0].quantity === 1) {
							dispatch(increment());
						}
					} else {
						setCookie('cartId', res.data.newCart._id, { path: '/' });
					}
				} else {
				}
			});
	}

	return (
		<Button variant="outline" onClick={addToCardHandler}>
			<FontAwesomeIcon icon={faCartPlus} size="lg" />
		</Button>
	);
}
