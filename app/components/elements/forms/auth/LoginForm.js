import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useSession } from 'next-auth/react';

function LoginForm(props) {
	const schema = yup
		.object()
		.shape({
			email: yup.string().email('To nie jest prawidłowy adres email').required('To pole jest obowiązkowe'),
			password: yup.string().required('To pole jest obowiązkowe'),
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
		props.onAddClient(data);
	};
	return (
		<Form onSubmit={handleSubmit(onSubmit)} className="col-6" action="/api/auth/callback/credentials">
			<Form.Group>
				<Form.Label htmlFor="email">Email</Form.Label>
				<Form.Control type="text" id="email" />
				<Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
			</Form.Group>
			<Form.Group>
				<Form.Label htmlFor="password">Haslo</Form.Label>
				<Form.Control type="password" id="password" />
			</Form.Group>
			<div className="pt-2">
				<Button variant="primary" type="submit">
					Zaloguj się
				</Button>
			</div>
			<div className="pt-2">{props.children}</div>
		</Form>
	);
}

export default LoginForm;
