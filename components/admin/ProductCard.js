import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faEdit, faCircle } from '@fortawesome/free-solid-svg-icons';

function ProductCard(props) {
	function openProductDetails() {
		console.log('klikk');
	}
	return (
		<Link href={'/admin/product/' + props._id}>
			<Card style={{ width: '18rem' }} className="m-2" key={props._id}>
				<Card.Img variant="top" src={props.imageUrl} alt={props.imageUrl} />
				<Card.Body>
					<Card.Title className="d-flex align-items-center ">
						{props.title}
						<Badge bg="danger" className="d-flex mx-2" pill style={{ fontSize: '0.7rem' }}>
							Ukryte
						</Badge>
					</Card.Title>
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
		</Link>
	);
}

export default ProductCard;
