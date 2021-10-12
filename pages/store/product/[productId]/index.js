import ProductDetails from '../../../../components/products/ProductDetails';
import axios from 'axios';
export default function Home(props) {
	return (
		// <div></div>
		<ProductDetails
			_id={props.product.id}
			title={props.product.title}
			description={props.product.description}
			price={props.product.price}
			imageUrl={props.product.imageUrl}
		></ProductDetails>
	);
}

export async function getServerSideProps(context) {
	const productId = context.params.productId;
	const data = await axios.get('http://localhost:3000/api/getProducts', {
		params: {
			_id: productId,
		},
	});
	return {
		props: {
			product: data.data,
		},
	};
}
