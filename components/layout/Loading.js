import { Spinner } from 'react-bootstrap';
import { useState } from 'react';
import Link from 'next/link';
export default function Home(props) {
	const [longLoading, setLongLoading] = useState(false);
	setTimeout(function () {
		setLongLoading(true);
	}, 5000);
	return (
		<div className="d-flex gap-2 flex-column">
			<div className="d-flex flex-row justify-content-center gap-2">
				<Spinner animation="border" variant="primary" />
				<span className="m-0 d-flex justify-content-center">Ładowanie...</span>
			</div>
			{longLoading ? (
				<div className="d-flex justify-content-center align-items-center flex-column">
					<span>Ładowanie trwa zdecydowanie za długo, możesz nie mieć uprawnień do tej zawartości.</span>
					<span>
						Przejdź do strony głównej klikając <Link href="/">TUTAJ</Link>, lub skontaktuj się z administratorem
					</span>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
