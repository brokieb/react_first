import NewProductForm from '../../../components/admin/NewProductForm';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home(props) {
	const router = useRouter();
	function addProductHandler(data) {
		console.log('to dziala ;)');
		// axios
		// 	.post('/api/postNewProduct', {
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		params: {
		// 			title: data.title,
		// 			description: data.description,
		// 			price: data.price,
		// 			imageUrl: data.imageUrl,
		// 		},
		// 	})
		// 	.then((res) => {
		// 		if (res.status == '201') {
		// 			console.log('poprawnie dodano :)', res);
		// 			router.push('/');
		// 		} else {
		// 			console.log('blad');
		// 		}
		// 	});
	}
	return <NewProductForm onAddProduct={addProductHandler} product={props.product}></NewProductForm>;
}

export async function getServerSideProps() {
	return {
		props: {
			product: {
				title: 'asd',
				description: 'wa',
				price: '23.50',
				imageUrl: 'https://petner.com.pl/wp-content/uploads/2020/01/czy-psy-sie-poca-min.jpg',
			},
		},
	};
}
