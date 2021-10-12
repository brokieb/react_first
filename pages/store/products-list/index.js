import ProductsList from '../../../components/products/ProductsList';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home(props) {
	console.log(props);
	return <ProductsList products={props.products}></ProductsList>;
}

export async function getStaticProps() {
	const data = await axios.get('http://localhost:3000/api/getProducts');
	return {
		props: {
			products: data.data,
		},
	};
}
