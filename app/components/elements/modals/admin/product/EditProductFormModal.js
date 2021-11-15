import { useRef, useState } from 'react';
import { Button, Form, Modal, ListGroup, Tab } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import ThisProductCredentialsTable from '../../../../common/admin/product/ThisProductCredentialsTable';

export default function EditProductFormModal(props) {
	const [title, setTitle] = useState(props.product.title);
	const [description, setDescription] = useState(props.product.description);
	const [price, setPrice] = useState(props.product.price);
	const [imageUrl, setImageUrl] = useState(props.product.imageUrl);

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
		props.onEditProduct(data);
	};

	return (
		<Modal show={props.show} size="lg" onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edycja produktu</Modal.Title>
			</Modal.Header>
			<Tab.Container id="list-group-tabs-example" defaultActiveKey="#edit">
				<ListGroup horizontal>
					<ListGroup.Item action href="#edit">
						Edycja
					</ListGroup.Item>
					<ListGroup.Item action href="#credentials">
						Konta
					</ListGroup.Item>
				</ListGroup>
				<Tab.Content>
					<Tab.Pane eventKey="#edit">
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Modal.Body>
								<Form.Group>
									<Form.Label htmlFor="title">Tytuł</Form.Label>
									<Form.Control
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										type="text"
										required
										id="title"
										{...register('title')}
										isInvalid={!!errors.title}
									/>
									<Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
								</Form.Group>
								<Form.Group>
									<Form.Label htmlFor="image">Zdjęcie</Form.Label>
									<Form.Control
										value={imageUrl}
										onChange={(e) => setTitle(e.target.value)}
										type="url"
										required
										id="image"
										{...register('image')}
										isInvalid={!!errors.image}
									/>
									<Form.Control.Feedback type="invalid">{errors.image?.message}</Form.Control.Feedback>
								</Form.Group>
								<Form.Group>
									<Form.Label htmlFor="price">Cena</Form.Label>
									<Form.Control
										value={price}
										onChange={(e) => setTitle(e.target.value)}
										type="text"
										required
										id="price"
										{...register('price')}
										isInvalid={!!errors.price}
									/>
									<Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
								</Form.Group>
								<Form.Group>
									<Form.Label htmlFor="description">Opis</Form.Label>
									<Form.Control
										value={description}
										onChange={(e) => setTitle(e.target.value)}
										as="textarea"
										id="description"
										required
										rows="5"
										{...register('description')}
										isInvalid={!!errors.description}
									></Form.Control>
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
					</Tab.Pane>
					<Tab.Pane eventKey="#credentials">
						<Modal.Body>
							<ThisProductCredentialsTable productId={props.product._id}></ThisProductCredentialsTable>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={props.handleClose}>
								Zamknij
							</Button>
							<Button type="submit" variant="success">
								Zapisz
							</Button>
						</Modal.Footer>
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</Modal>
	);
}
