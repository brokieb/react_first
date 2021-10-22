import { Card, Badge, Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditProductFormModal from './EditProductFormModal';

function ProductCard(props) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	function editProductHandler() {
		console.log('klikk');
	}
	return (
		<Card style={{ width: '18rem' }} className="m-2" key={props._id}>
			<Card.Img variant="top" src={props.imageUrl} alt={props.imageUrl} />
			<Card.Body>
				<div className="d-flex justify-content-between align-items-center">
					<Card.Title>{props.title}</Card.Title>
					<Form.Check type="switch" variant="success" id="custom-switch" />
				</div>
				<Card.Text>{props.description}</Card.Text>
				<div className="d-flex justify-content-between align-items-center">
					<div className="gap-2 d-flex">
						<Link href="#">
							<Button href="#" variant="outline">
								<FontAwesomeIcon size="lg" icon={faEye} />
							</Button>
						</Link>
						<Button variant="outline" onClick={handleShow}>
							<FontAwesomeIcon size="lg" icon={faEdit} />
						</Button>
					</div>

					<h4 className="m-0">{props.price} zł</h4>
				</div>
			</Card.Body>
			<EditProductFormModal show={show} handleClose={handleClose} onEditProduct={editProductHandler} product={props}></EditProductFormModal>
		</Card>
	);
}

export default ProductCard;
