import ProductsList from '../components/store/ProductsList';
import axios from 'axios';
import Link from 'next/link';
export default function Home(props) {
	if (props.products != undefined) {
		return (
			<div>
				strona główna
				<h1>TEST 2 2 22</h1>
				<p>asdaasda</p>
				<p>asdaasda</p>
				<p>asdaasda</p>
				<Link href="/auth/login">TEST </Link>
				<ProductsList products={props.products}></ProductsList>
			</div>
		);
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
