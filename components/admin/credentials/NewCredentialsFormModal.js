import { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

export default function NewCredentialsFormModal(props) {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [active, setActive] = useState('checked');
	const [product, setProducts] = useState({ data: [] });

	function genCredentialsHandler() {
		const PRE_MAIL = 'brokieb';
		const MAIL_DOMAIN = 'gmail.com';
		const LEN_LOGIN_NUMS = 4;
		const LEN_PW = 6;
		const NUMBERS = '0123456789';
		const NUM_LEN = NUMBERS.length;
		let nums = '';
		for (let i = 0; i < LEN_LOGIN_NUMS; i++) {
			nums += NUMBERS.charAt(Math.floor(Math.random() * NUM_LEN));
		}
		const CHARACTERS = 'ABCDEFGHKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
		const CHA_LEN = CHARACTERS.length;
		let pw = '';
		for (let i = 0; i < LEN_PW; i++) {
			pw += CHARACTERS.charAt(Math.floor(Math.random() * CHA_LEN));
		}
		setLogin(PRE_MAIL + '+' + nums + '@' + MAIL_DOMAIN);
		setPassword(pw);
	}

	const schema = yup
		.object()
		.shape({
			email: yup.string().required('To pole jest obowiązkowe'),
			password: yup.string().required('To pole jest obowiązkowe'),
			expiredIn: yup.date('To nie jest poprawna data').required('To pole jest obowiązkowe'),
			productId: yup.string().required('To pole jest obowiązkowe'),
		})
		.required();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		props.onAddCredentials(data);
	};

	async function ProductsSelect() {
		const data = await axios.get('http://localhost:3000/api/getProducts', {
			params: {
				_id: null,
			},
		});
		setProducts(data);
		console.log('to wczytane');
	}
	useEffect(() => {
		ProductsSelect();
	}, []);
	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Dodaj konto</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body className="pt-0">
					<Form.Group>
						<Form.Label className="mt-2 mb-0" htmlFor="login">
							email
						</Form.Label>
						<Form.Control
							value={login}
							onChange={(e) => setLogin(e.target.value)}
							type="text"
							id="email"
							{...register('email')}
							isInvalid={!!errors.login}
						/>
						<Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label className="mt-2 mb-0" htmlFor="password">
							Hasło
						</Form.Label>
						<Form.Control
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="text"
							id="password"
							{...register('password')}
							isInvalid={!!errors.password}
						/>
						<Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label className="mt-2 mb-0" htmlFor="expiredIn">
							Aktywne do
						</Form.Label>
						<Form.Control type="date" id="expiredIn" {...register('expiredIn')} isInvalid={!!errors.expiredIn} />
						<Form.Control.Feedback type="invalid">{errors.expiredIn?.message}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label className="mt-2 mb-0" htmlFor="productId">
							Produkt
						</Form.Label>
						<Form.Select aria-label="Default select example" id="productId" {...register('productId')} isInvalid={!!errors.productId}>
							<option>Open this select menu</option>
							{product.data.map((data, i) => (
								<option key={i} value={data._id}>
									{data.title}
								</option>
							))}
						</Form.Select>
						<Form.Control.Feedback type="invalid">{errors.productId?.message}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Check
							className="mt-2 mb-0"
							size="lg"
							type="switch"
							id="custom-switch"
							label="Konto aktywne"
							id="active"
							checked={active}
							onChange={(e) => setActive(e.target.value)}
							{...register('active')}
						/>
						<Form.Control.Feedback type="invalid">{errors.active?.message}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label className="mt-2 mb-0" htmlFor="comment">
							Komentarz
						</Form.Label>
						<Form.Control as="textarea" id="comment" rows="5" {...register('comment')} isInvalid={!!errors.comment}></Form.Control>
						<Form.Control.Feedback type="invalid">{errors.comment?.message}</Form.Control.Feedback>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer className="d-flex justify-content-between">
					<div>
						<Button variant="primary" onClick={genCredentialsHandler}>
							Generuj dane
						</Button>
					</div>
					<div>
						<Button variant="secondary" onClick={props.handleClose}>
							Zamknij
						</Button>
						<Button type="submit" variant="success">
							Zapisz
						</Button>
					</div>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

export async function getServerSideProps() {
	const data = await axios.get('http://localhost:3000/api/getProducts', {
		params: {
			_id: null,
		},
	});
	return {
		props: {
			products: data.data,
		},
	};
}
