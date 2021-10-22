import ProductsList from '../../../components/admin/ProductsList';

import axios from 'axios';

import { Button, Card } from 'react-bootstrap';

export default function Home(props) {
	return (
		<div>
			<ProductsList products={props.products}></ProductsList>
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
