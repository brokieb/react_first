import { useSession, signIn } from 'next-auth/react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
export default function Home(currentPage) {
	const { data: session } = useSession();
	console.log(session);
	const userDetails = session.user;
	return (
		<div className="d-flex justify-content-between w-50">
			<div>
				<h1>{userDetails.name}</h1>
				<h3>twoj@email.pl</h3>
				<p>Inna informacja bardzo ważna</p>
				<p>Inna informacja bardzo ważna</p>
				<div>
					<Button variant="danger">Usuń konto</Button>
				</div>
			</div>
			<div style={{ width: '150px' }}>
				<Image src={userDetails.image} roundedCircle className="border-primary w-100" />
			</div>
		</div>
	);
}
