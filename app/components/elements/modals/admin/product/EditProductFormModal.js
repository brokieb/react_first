import { useRef, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import EditProductForm from 'app/components/elements/forms/admin/product/editProductForm';

export default function EditProductFormModal(props) {
	const schema = yup
		.object()
		.shape({
			title: yup.string().required('To pole jest obowiązkowe'),
			imageUrl: yup
				.string()
				.url('To nie jest poprawny adres URL')
				.required('To pole jest obowiązkowe'),
			price: yup.number('To nie jest poprawna kwota').required('To pole jest obowiązkowe'),
			description: yup.string().required('To pole jest obowiązkowe'),
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
		props.onAddProduct(data);
	};

	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edytuj produkt</Modal.Title>
			</Modal.Header>
			<EditProductForm />
		</Modal>
	);
}
