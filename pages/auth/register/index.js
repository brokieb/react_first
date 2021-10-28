import NewClientForm from '../../../components/auth/NewClientForm';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
	const router = useRouter();
	function addClientHandler(data) {
		axios
			.post('/api/auth/postNewUser', {
				headers: {
					'Content-Type': 'application/json',
				},
				params: {
					name: data.name,
					email: data.email,
					password: data.password,
				},
			})
			.then((res) => {
				if (res.status == '201') {
					console.log('poprawnie dodano :)', res);
					router.push('/auth/login');
				} else {
					console.log('blad');
				}
			});
	}
	return <NewClientForm onAddClient={addClientHandler}></NewClientForm>;
}
