import { useRef, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

export default function NewProductFormModal(props) {
	const schema = yup
		.object()
		.shape({
			title: yup.string().required('To pole jest obowiązkowe'),
			imageUrl: yup.string().url('To nie jest poprawny adres URL').required('To pole jest obowiązkowe'),
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
				<Modal.Title>Dodaj produkt</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					<Form.Group>
						<Form.Label htmlFor="title">Tytuł</Form.Label>
						<Form.Control type="text" id="title" {...register('title')} isInvalid={!!errors.title} />
						<Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label htmlFor="imageUrl">Zdjęcie</Form.Label>
						<Form.Control type="url" id="imageUrl" {...register('imageUrl')} isInvalid={!!errors.imageUrl} />
						<Form.Control.Feedback type="invalid">{errors.imageUrl?.message}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label htmlFor="price">Cena</Form.Label>
						<Form.Control type="decimal" id="price" {...register('price')} isInvalid={!!errors.price} />
						<Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label htmlFor="description">Opis</Form.Label>
						<Form.Control as="textarea" id="description" rows="5" {...register('description')} isInvalid={!!errors.description}></Form.Control>
						<Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.handleClose}>
						Zamknij
					</Button>
					<Button type="submit" variant="success">
						Zapisz
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}
