import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { increment } from 'app/features/counter/counterSlice';
import { useCookies } from 'react-cookie';
import axiosInstance from 'app/lib/axiosInstance';
import { useSession } from 'next-auth/react';
import PopAlert from 'app/components/modules/popAlert';

export default function AddToCardButton(props) {
	const dispatch = useDispatch();
	const [alertData, setAlertData] = useState({});
	const { data: session, status } = useSession();
	const [cookies, setCookie] = useCookies(['cart']);

	function addToCardHandler() {
		axiosInstance
			.put('/api/cart/putAddCardProduct', {
				params: {
					productId: props._id,
					cart: cookies.cartId,
				},
			})
			.then((res) => {
				if (status === 'authenticated') {
					const filteredArray = res.data.newCart.cart.items.filter((element) => {
						return element.productId.toString() === props._id;
					});
					if (filteredArray[0].quantity === 1) {
						setAlertData({
							variant: 'success',
							title: 'Sukces',
							body: 'Poprawnie zaktualizowano koszyk!',
							cb: () => {
								setAlertData({});
							},
						});
						dispatch(increment());
					} else {
						setAlertData({
							variant: 'success',
							title: 'Sukces',
							body: 'Poprawnie dodano produkt do koszyka!',
							cb: () => {
								setAlertData({});
							},
						});
					}
				} else {
					setCookie('cartId', res.data.newCart._id, { path: '/' });
				}
			})
			.catch((err) => {});
	}

	return (
		<Button variant="outline" onClick={addToCardHandler}>
			<FontAwesomeIcon icon={faCartPlus} size="lg" />
			<PopAlert data={alertData} />
		</Button>
	);
}
