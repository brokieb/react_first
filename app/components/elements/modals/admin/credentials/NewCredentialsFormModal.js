import { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { Formik } from 'formik';
import axiosInstance from 'app/lib/axiosInstance';

export default function NewCredentialsFormModal(props) {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [active, setActive] = useState(true);
	const [product, setProducts] = useState({ data: [] });
	const [usersMaxLen, setUsersMaxLen] = useState('');

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
	async function getProductDetailsHandler(id) {
		const data = await axiosInstance.get('/api/prods/getProducts', {
			params: {
				_id: id,
			},
		});
		const thisSetting = data.data.settings;
		setUsersMaxLen(thisSetting.usersPerAccount);
	}

	const schema = yup
		.object()
		.shape({
			login: yup.string().required('To pole jest obowiązkowe'),
			password: yup.string().required('To pole jest obowiązkowe'),
			expiredIn: yup.date('To nie jest poprawna data').required('To pole jest obowiązkowe'),
			productId: yup.string().required('To pole jest obowiązkowe'),
			usersMaxLen: yup.number('To nie jest poprawna liczba').required('To pole jest obowiązkowe'),
		})
		.required();

	async function ProductsSelect() {
		const data = await axiosInstance.get('/api/prods/getProducts', {
			params: {
				_id: null,
			},
		});
		setProducts(data);
	}
	useEffect(() => {
		ProductsSelect();
	}, []);
	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Dodaj konto</Modal.Title>
			</Modal.Header>
			<Formik
				validationSchema={schema}
				validateOnChange={false}
				validateOnBlur={false}
				onSubmit={(values) => {
					props.onAddCredentials(values);
				}}
				initialValues={{
					login: login,
					password: password,
					expiredIn: '',
					productId: '',
					usersMaxLen: usersMaxLen,
					active: true,
					comment: '',
				}}
			>
				{({ errors, values, handleChange, handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						<Modal.Body className="pt-0">
							<Form.Group>
								<Form.Label className="mt-2 mb-0" htmlFor="login">
									login
								</Form.Label>
								<Form.Control defaultValue={login} onChange={handleChange} type="text" name="login" isInvalid={!!errors.login} />
								<Form.Control.Feedback type="invalid">{errors.login}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label className="mt-2 mb-0" htmlFor="password">
									Hasło
								</Form.Label>
								<Form.Control defaultValue={password} onChange={handleChange} type="text" name="password" isInvalid={!!errors.password} />
								<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label className="mt-2 mb-0" htmlFor="expiredIn">
									Aktywne do
								</Form.Label>
								<Form.Control type="date" id="expiredIn" isInvalid={!!errors.expiredIn} />
								<Form.Control.Feedback type="invalid">{errors.expiredIn}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label className="mt-2 mb-0" htmlFor="productId">
									Produkt
								</Form.Label>
								<Form.Select
									name="productId"
									isInvalid={!!errors.productId}
									onChange={(e) => {
										getProductDetailsHandler(e.target.value);
									}}
								>
									<option disabled="disabled">Wybierz produkt</option>
									{product.data.map((data, i) => (
										<option key={i} value={data._id}>
											{data.title}
										</option>
									))}
								</Form.Select>
								<Form.Control.Feedback type="invalid">{errors.productId}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label className="mt-2 mb-0" htmlFor="login">
									Max użytkowników
								</Form.Label>
								<Form.Control defaultValue={usersMaxLen} onChange={handleChange} type="number" name="usersMaxLen" isInvalid={!!errors.usersMaxLen} />
								<Form.Control.Feedback type="invalid">{errors.usersMaxLen}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Check
									defaultChecked={active}
									className="mt-2 mb-0"
									size="lg"
									type="switch"
									label="Konto aktywne"
									name="active"
									onChange={handleChange}
								/>
								<Form.Control.Feedback type="invalid">{errors.active}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label className="mt-2 mb-0" htmlFor="comment">
									Komentarz
								</Form.Label>
								<Form.Control as="textarea" name="comment" rows="5" isInvalid={!!errors.comment}></Form.Control>
								<Form.Control.Feedback type="invalid">{errors.comment}</Form.Control.Feedback>
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
				)}
			</Formik>
		</Modal>
	);
}

export async function getServerSideProps() {
	const data = await axiosInstance.get('/api/prods/getProducts', {
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
