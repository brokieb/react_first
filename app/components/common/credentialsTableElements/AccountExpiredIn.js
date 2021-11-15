import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';

export default function AccountExpiredIn(props) {
	const [color, setColor] = useState('');
	const [text, setText] = useState('');
	const dateDiff = DateTime.fromISO(props.date).diff(DateTime.now(), ['days']).values;

	useEffect(() => {
		if (dateDiff.days < 0) {
			setColor('danger');
			setText('po czasie');
		} else if (dateDiff.days < 3) {
			setColor('warning');
			setText('3 dni');
		} else if (dateDiff.days < 5) {
			setColor('info');
			setText('5 dni');
		} else {
			setColor('');
			setText('');
		}
	}, []);
	return (
		<div className="d-flex justify-content-between">
			{DateTime.fromISO(props.date).toFormat('dd-MM-yyyy')}
			{text ? <Badge bg={color}>{text}</Badge> : <></>}
		</div>
	);
}
