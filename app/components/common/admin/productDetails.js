import Image from 'react-bootstrap/Image';

export default function ProductDetails(props) {
	return (
		<div className="row justify-content-between">
			<div className="col-6">
				PODPIS #{props._id}-<h2>{props.title}</h2>
				<p>{props.description}</p>
				<strong>{props.price}</strong>
			</div>
			<div className="col-6">
				<Image src={props.imageUrl} className="w-100" rounded />
			</div>
		</div>
	);
}
