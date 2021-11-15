import { Image, Button } from 'react-bootstrap';

export default function ProductDetails(props) {
	return (
		<div className="row justify-content-between">
			<div className="col-6">
				<small>Symbol: {props.product.SKU}</small>
				<h1>{props.product.title}</h1>
				<p className="ps-3 col-10">{props.product.description}</p>
				<div className="d-flex justify-content-around align-items-center">
					<h2>{props.product.price} zł</h2>
					<div>
						<Button variant="success">Kup teraz!</Button>
					</div>
				</div>
			</div>
			<div className="col-6">
				<Image src={props.product.imageUrl} className="w-100" rounded />
			</div>
		</div>
	);
}
