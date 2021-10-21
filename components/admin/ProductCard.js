import { Card, Badge, Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faEdit, faCircle } from '@fortawesome/free-solid-svg-icons';

function ProductCard(props) {
	function openProductDetails() {
		console.log('klikk');
	}
	return (
		<Card style={{ width: '18rem' }} className="m-2" key={props._id}>
			<Link href={'/admin/new-product/' + props._id}>
				<Card.Img variant="top" src={props.imageUrl} alt={props.imageUrl} />
			</Link>
			<Card.Body>
				<div className="d-flex justify-content-between align-items-center">
					<Link href={'/admin/new-product/' + props._id}>
						<a className="link-primary card-title h5">{props.title}</a>
					</Link>
					<Form.Check type="switch" variant="success" id="custom-switch" />
				</div>
				<Card.Text>{props.description}</Card.Text>
				<div className="d-flex justify-content-between align-items-center">
					<div className="gap-2 d-flex">
						<Link href="#">
							<Button href="#" variant="outline">
								<FontAwesomeIcon size="lg" />
							</Button>
						</Link>
					</div>

					<h4 className="m-0">{props.price} zł</h4>
				</div>
			</Card.Body>
		</Card>
	);
}

export default ProductCard;
