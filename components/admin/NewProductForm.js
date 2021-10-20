import { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function NewProductForm(props) {
	const titleInputRef = useRef();
	const imageInputRef = useRef();
	const priceInputRef = useRef();
	const descriptionInputRef = useRef();

	function submitHandler(event) {
		event.preventDefault();

		const enteredTitle = titleInputRef.current.value;
		const enteredImage = imageInputRef.current.value;
		const enteredPrice = priceInputRef.current.value;
		const enteredDescription = descriptionInputRef.current.value;

		const productData = {
			title: enteredTitle,
			imageUrl: enteredImage,
			price: enteredPrice,
			description: enteredDescription,
		};

		props.onAddProduct(productData);
	}

	return (
		<Form onSubmit={submitHandler} className="col-6">
			<Form.Group>
				<Form.Label htmlFor="title">Tytuł</Form.Label>
				<Form.Control type="text" required id="title" ref={titleInputRef} />
			</Form.Group>
			<Form.Group>
				<Form.Label htmlFor="image">Zdjęcie</Form.Label>
				<Form.Control type="url" required id="image" ref={imageInputRef} />
			</Form.Group>
			<Form.Group>
				<Form.Label htmlFor="price">Cena</Form.Label>
				<Form.Control type="text" required id="price" ref={priceInputRef} />
			</Form.Group>
			<Form.Group>
				<Form.Label htmlFor="description">Opis</Form.Label>
				<Form.Control as="textarea" id="description" required rows="5" ref={descriptionInputRef}></Form.Control>
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
