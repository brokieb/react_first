import NewProductForm from '../../../components/products/NewProductForm';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
	const router = useRouter();
	function addProductHandler(data) {
		axios
			.post('/api/postNewProduct', {
				headers: {
					'Content-Type': 'application/json',
				},
				params: {
					title: data.title,
					description: data.description,
					price: data.price,
					imageUrl: data.imageUrl,
				},
			})
			.then((res) => {
				if (res.status == '201') {
					console.log('poprawnie dodano :)', res);
					router.push('/');
				} else {
					console.log('blad');
				}
			});
	}
	return <NewProductForm onAddProduct={addProductHandler}></NewProductForm>;
}
