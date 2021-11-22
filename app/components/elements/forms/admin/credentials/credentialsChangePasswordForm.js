import { useEffect, useState, useContext } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import axiosInstance from 'app/lib/axiosInstance';
import { CredentialsDataContext } from 'pages/admin/credentials/index';
import GetIndex from 'app/components/modules/getIndex';
export default function credentialsChangePasswordForm({ credId }) {
	const [password, setPassword] = useState('');
	const [passwordValid, setPasswordValid] = useState(false);

	const [comment, setComment] = useState('');
	const [commentValid, setCommentValid] = useState(false);

	const [expiredIn, setExpiredIn] = useState('');
	const [expiredInValid, setExpiredInValid] = useState(false);

	const [sendMail, setSendMail] = useState(true);
	const [readyData, setReadyData] = useState('');

	const { credentialsData, setCredentialsData } = useContext(CredentialsDataContext);

	useEffect(() => {
		const index = GetIndex(credentialsData, credId);
		console.log(dayjs(credentialsData[index].expiredIn).format('yyyy-MM-dd'), '@@@@@@@@@@');
		if (credentialsData[index]) {
			setReadyData(credentialsData[index]);
			setPassword(credentialsData[index].password);
			setComment(credentialsData[index].comment);
			setExpiredIn(dayjs(credentialsData[index].expiredIn).format('YYYY-MM-DD'));
		}
	}, [credId]);

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
		console.log(pw, 'WYGENEROWANE');
		setPasswordValid(true);
		setPassword(pw);
	}
	const schema = yup
		.object()
		.shape({
			password: yup.string().required('To pole jest obowiązkowe'),
		})
		.required();

	return (
		<Formik
			validationSchema={schema}
			enableReinitialize
			validateOnChange={true}
			validateOnBlur={true}
			onSubmit={(values) => {
				console.log('ZAAKCEPTOWAno form', values, readyData._id);
				axiosInstance
					.put('/api/creds/putEditCredentials', {
						params: {
							id: readyData._id,
							password: values.password,
							expiredIn: values.expiredIn,
							comment: values.comment,
						},
					})
					.then((ans) => {
						const index = GetIndex(credentialsData, readyData._id);
						setCredentialsData((item) => {
							return item.map((item, index) => {
								if (item._id == readyData._id) {
									item.password = values.password;
									item.expiredIn = values.expiredIn;
									item.comment = values.comment;
								}
								return item;
							});
						});
						setPasswordValid(false);
						setCommentValid(false);
						setExpiredInValid(false);
					});
			}}
			initialValues={{
				password: password,
				sendMail: true,
				comment: comment,
				expiredIn: expiredIn,
			}}
		>
			{({ errors, values, touched, handleChange, handleSubmit, validateField, setFieldValue }) => (
				<Form id="credentialsChangePasswordForm" onSubmit={handleSubmit}>
					<Modal.Body className="pt-0">
						<Form.Group>
							<InputGroup className="mb-3" htmlFor="password">
								<Form.Control
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
										setFieldValue('password', e.target.value);
										setPasswordValid(true);
									}}
									variant="primary"
									type="text"
									name="password"
									isInvalid={!!errors.password}
									isValid={passwordValid && !errors.password}
								/>
								<Button
									variant="outline-secondary"
									onClick={() => {
										genCredentialsHandler();
									}}
								>
									GENERUJ
								</Button>
								<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
								<Form.Control.Feedback>DANE ZMIENIONE</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
						<Form.Group>
							<Form.Check
								defaultChecked={sendMail}
								className="mt-2 mb-0"
								size="lg"
								type="checkbox"
								label="Wyślij nowe hasło do wszystkich użytkowników"
								name="sendMail"
								id="custom-switch"
								onChange={handleChange}
							/>
							<Form.Control.Feedback type="invalid">{errors.sendMail}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label className="mt-2 mb-0" htmlFor="expiredIn">
								Aktywne do
							</Form.Label>
							<Form.Control
								defaultValue={expiredIn}
								onChange={(e) => {
									setExpiredInValid(true);
									setFieldValue('expiredIn', e.target.value);
								}}
								type="date"
								name="expiredIn"
								isInvalid={!!errors.expiredIn}
								isValid={expiredInValid && !errors.expiredIn}
							/>
							<Form.Control.Feedback type="invalid">{errors.expiredIn}</Form.Control.Feedback>
							<Form.Control.Feedback>DANE ZMIENIONE</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label className="mt-2 mb-0" htmlFor="comment">
								Komentarz
							</Form.Label>
							<Form.Control
								defaultValue={comment}
								onChange={(e) => {
									setCommentValid(true);
									setFieldValue('comment', e.target.value);
								}}
								as="textarea"
								name="comment"
								rows="5"
								isInvalid={!!errors.comment}
								isValid={commentValid && !errors.comment}
							></Form.Control>
							<Form.Control.Feedback type="invalid">{errors.comment}</Form.Control.Feedback>
							<Form.Control.Feedback>DANE ZMIENIONE</Form.Control.Feedback>
						</Form.Group>
					</Modal.Body>
				</Form>
			)}
		</Formik>
	);
}
