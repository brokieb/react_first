import ProductsList from '../components/products/ProductsList';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home(props) {
	return (
		<div>
			<h2>Najczęściej kupowane</h2>
			<ProductsList products={props.products}></ProductsList>
			<h2>WAarto spojrzeć</h2>
			<h2>Ostatnie zakupy</h2>
			<h2>Przeceny</h2>
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
