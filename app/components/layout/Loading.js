import { Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Loading(props) {
	const [longLoading, setLongLoading] = useState(false);
	useEffect(() => {
		const timer = setTimeout(function () {
			setLongLoading(true);
		}, 5000);
		return () => clearTimeout(timer);
	}, []);
	const color = props.color ? props.color : null;
	switch (props.variant) {
		case 'tiny':
			return <Spinner animation="border" size="sm" variant={color} />;
			break;
		default:
			return (
				<div className="d-flex gap-2 flex-column py-2">
					<div className="d-flex flex-row justify-content-center gap-2">
						<Spinner animation="border" variant={color} />
						<span className="m-0 d-flex justify-content-center">Ładowanie...</span>
					</div>
					{longLoading ? (
						<div className="d-flex justify-content-center align-items-center flex-column">
							<span>
								Ładowanie trwa zdecydowanie za długo, możesz nie mieć uprawnień do tej zawartości.
							</span>
							<span>
								Przejdź do strony głównej klikając <Link href="/">TUTAJ</Link>, lub skontaktuj się z
								administratorem
							</span>
						</div>
					) : (
						<></>
					)}
				</div>
			);
			break;
	}
}
