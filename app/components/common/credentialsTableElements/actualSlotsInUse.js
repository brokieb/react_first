import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ActualSlotsInUse(props) {
	const [buttonStatus, setbuttonStatus] = useState('loading');

	const ans = [];
	for (const i = 0; i < props.maxUsers; i++) {
		if (i > 4) {
			ans.push(<span key={i}>...</span>);
			break;
		} else {
			ans.push(<FontAwesomeIcon key={i} icon={i < props.nowUsers ? faUser : farUser} />);
		}
	}

	return ans;
}
