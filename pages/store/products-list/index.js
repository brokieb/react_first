import ProductsList from '../../../components/store/ProductsList';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home(props) {
	if (props.products != undefined) {
		return <ProductsList products={props.products}></ProductsList>;
	} else {
		return <h2>Nothing here</h2>;
	}
}

export async function getServerSideProps() {
	console.log('@@@@@@@@@@@@@@@@@@@@@@');
	const data = await axios.get('http://localhost:3000/api/getProducts', {
		params: {
			_id: null,
		},
	});
	return {
		props: {
			products: data.data,
		},
	};
}
