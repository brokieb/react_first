import NewProductForm from '../../../components/admin/NewProductForm';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home(context) {
	const router = useRouter();
	console.log('to uruchamianko???? xddd');
	function addProductHandler(data) {
		console.log('to uruchamianko????');
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
