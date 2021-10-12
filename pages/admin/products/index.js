import ProductsList from '../../../components/products/ProductsList';
import axios from 'axios';

export default function Home(props) {
	return (
		<div>
			<ProductsList editMode="true" products={props.products}></ProductsList>
		</div>
	);
}

export async function getServerSideProps() {
	const data = await axios.get('http://localhost:3000/api/getProducts');
	return {
		props: {
			products: data.data,
		},
	};
}
