import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function NewProductForm(props) {
	const [product, setProduct] = useState(props.product);
	const schema = yup
		.object()
		.shape({
			title: yup.string().required('To pole jest obowiązkowe'),
			image: yup.string().required('To pole jest obowiązkowe'),
			price: yup.string().required('To pole jest obowiązkowe'),
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
		console.log(data, 'tooo?');
		props.onAddProduct(data);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className="col-6">
			<Form.Group>
				<Form.Label htmlFor="title">Tytuł</Form.Label>
				<Form.Control value={props.product.title} type="text" required id="title" {...register('title')} isInvalid={!!errors.title} />
				<Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
			</Form.Group>
			<Form.Group>
				<Form.Label htmlFor="image">Zdjęcie</Form.Label>
				<Form.Control type="url" required id="image" {...register('image')} isInvalid={!!errors.image} />
				<Form.Control.Feedback type="invalid">{errors.image?.message}</Form.Control.Feedback>
			</Form.Group>
			<Form.Group>
				<Form.Label htmlFor="price">Cena</Form.Label>
				<Form.Control type="text" required id="price" {...register('price')} isInvalid={!!errors.price} />
				<Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
			</Form.Group>
			<Form.Group>
				<Form.Label htmlFor="description">Opis</Form.Label>
				<Form.Control as="textarea" id="description" required rows="5" {...register('description')} isInvalid={!!errors.description}></Form.Control>
				<Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
			</Form.Group>
			<div className="pt-2">
				<Button variant="primary" type="submit">
					Wyslij
				</Button>
			</div>
		</Form>
	);
}

export default NewProductForm;
