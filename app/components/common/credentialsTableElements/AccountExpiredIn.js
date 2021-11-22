import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import dayjs from 'dayjs';
export default function AccountExpiredIn(props) {
	const [color, setColor] = useState('');
	const [text, setText] = useState('');

	const dateDiff = dayjs(props.date).diff(dayjs(), 'day');
	useEffect(() => {
		if (dateDiff < 0) {
			setColor('danger');
			setText('po czasie');
		} else if (dateDiff == 0) {
			setColor('danger');
			setText('do dziś');
		} else if (dateDiff < 3) {
			setColor('warning');
			setText('3 dni');
		} else if (dateDiff < 5) {
			setColor('info');
			setText('5 dni');
		} else {
			setColor('');
			setText('');
		}
	}, [props.date]);
	return (
		<div className="d-flex justify-content-between">
			{dayjs(props.date).format('DD/MM/YYYY')}
			{text ? <Badge bg={color}>{text}</Badge> : <></>}
		</div>
	);
}
