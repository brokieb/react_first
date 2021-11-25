import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import AddToCardButton from 'app/components/elements/buttons/store/addToCardButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercent } from '@fortawesome/free-solid-svg-icons';

function ProductCard(props) {
	return (
		<Card style={{ width: '18rem' }} className="m-2" key={props.product._id}>
			{Object.keys(props.product.discount).length > 1 && (
				<div
					className="position-absolute bg-danger d-flex justify-content-center align-items-center rounded-circle"
					style={{ width: '50px', height: '50px', left: '-10px', top: '-10px' }}
				>
					<FontAwesomeIcon size="2x" icon={faPercent} className="text-light" />
				</div>
			)}
			<Link href={'/store/product/' + props.product._id}>
				<Card.Img
					variant="top"
					src={props.product.imageUrl}
					alt={props.product.imageUrl}
					style={{ cursor: 'pointer' }}
				/>
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
						<AddToCardButton _id={props.product._id} />
					</div>
					{Object.keys(props.product.discount).length > 1 ? (
						<div>
							<s className="m-0 text-danger">{props.product.price} zł</s>
							<h4 className="m-0 text-success">30.50 zł</h4>
						</div>
					) : (
						<h4 className="m-0 cursor-pointer">{props.product.price} zł</h4>
					)}
				</div>
			</Card.Body>
		</Card>
	);
}

export default ProductCard;
