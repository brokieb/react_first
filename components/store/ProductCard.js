import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import AddToCardButton from './addToCardButton';
function ProductCard(props) {
	function openProductDetails() {
		console.log('klikk');
	}
	return (
		<Card style={{ width: '18rem' }} className="m-2" key={props.product._id}>
			<Link href={'/store/product/' + props.product._id}>
				<Card.Img variant="top" src={props.product.imageUrl} alt={props.product.imageUrl} style={{ cursor: 'pointer' }} />
			</Link>
			<Card.Body>
				<Link href={'/store/product/' + props.product._id}>
					<a className="link-primary card-title h5">{props.product.title}</a>
				</Link>
				<Card.Text>{props.product.shortDescription}</Card.Text>
				<div className="d-flex justify-content-between align-items-center">
					<div className="gap-2 d-flex">
						<AddToCardButton _id={props.product._id} />
					</div>
					<h4 className="m-0 cursor-pointer">{props.product.price} zł</h4>
				</div>
			</Card.Body>
		</Card>
	);
}

export default ProductCard;
