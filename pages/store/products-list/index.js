import ProductsList from '../../../components/store/ProductsList';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home(props) {
	if (props.products != undefined) {
		return <ProductsList products={props.products}></ProductsList>;
	} else {
		return <h2>Nothing here</h2>;
	}
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
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
	// if (!session) {
	// 	console.log('tutaj klika');
	// 	return {
	// 		redirect: {
	// 			destination: '/',
	// 			permanent: false,
	// 		},
	// 	};
	// }
	console.log('uruchamiam');
}

// export async function getServerSideProps() {
//   console.log('@@@@@@@@@@@@@@@@@@@@@@');

// }
