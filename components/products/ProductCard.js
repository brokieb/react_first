import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

function ProductCard(props) {
	function openProductDetails() {
		console.log('klikk');
	}
	function EditMode(props) {
		if (props.edit == 'true') {
			return (
				<Button variant="outline">
					<FontAwesomeIcon icon={faEdit} size="lg" />
				</Button>
			);
		} else {
			return null;
		}
	}
	return (
		<Link href={'/store/product/' + props._id}>
			<Card style={{ width: '18rem' }} className="m-2" key={props._id}>
				<Card.Img variant="top" src={props.imageUrl} alt={props.imageUrl} />
				<Card.Body>
					<Card.Title>{props.title}</Card.Title>
					<Card.Text>{props.description}</Card.Text>
					<div className="d-flex justify-content-between align-items-center">
						<div className="gap-2 d-flex">
							<Link href="#">
								<Button href="#" variant="outline">
									<FontAwesomeIcon icon={faCartPlus} size="lg" />
								</Button>
							</Link>
							<EditMode edit={props.editMode} />
						</div>

						<h4 className="m-0">{props.price} zł</h4>
					</div>
				</Card.Body>
			</Card>
		</Link>
	);
}

export default ProductCard;
