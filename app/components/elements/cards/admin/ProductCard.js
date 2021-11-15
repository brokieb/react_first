import { Card, Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';

import EditProductFormModal from 'app/components/elements/modals/admin/product/EditProductFormModal';

function ProductCard(props) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	function editProductHandler() {}
	return (
		<Card style={{ width: '18rem' }} className="m-2" key={props.product._id}>
			<Link href={'/store/product/' + props.product._id}>
				<Card.Img variant="top" src={props.product.imageUrl} alt={props.product.imageUrl} style={{ cursor: 'pointer' }} />
			</Link>
			<Card.Body className="d-flex flex-column justify-content-between">
				<div>
					<Link href={'/store/product/' + props.product._id}>
						<a className="link-primary card-title h5">{props.product.title}</a>
					</Link>
					<Card.Text>{props.product.shortDescription}</Card.Text>
				</div>
				<div className="d-flex justify-content-around align-items-center">
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
					<h4 className="m-0 cursor-pointer">{props.product.price} zł</h4>
				</div>
			</Card.Body>
			<EditProductFormModal show={show} handleClose={handleClose} onEditProduct={editProductHandler} product={props.product}></EditProductFormModal>
		</Card>
	);
}
export default ProductCard;
