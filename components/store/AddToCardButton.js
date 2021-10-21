import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

export default function AddToCardButton() {
	function clickHandler() {
		console.log('esa');
	}

	return (
		<Button variant="outline" onClick={clickHandler}>
			<FontAwesomeIcon icon={faCartPlus} size="lg" />
		</Button>
	);
}
