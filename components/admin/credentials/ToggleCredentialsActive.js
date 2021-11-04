import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { faLock, faUnlock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ToggleCredentialsActive(props) {
	const [buttonStatus, setbuttonStatus] = useState('loading');
	const [buttonStatusLoading, setbuttonStatusLoading] = useState(true);

	if (props.init) {
		setbuttonStatus(props.arg.active ? 'unlocked' : 'locked');
	}

	async function lockerHandler(id, index) {
		axios
			.put('/api/putEditCredentials', {
				headers: {
					'Content-Type': 'application/json',
				},
				params: {
					id: id,
					newStatus: buttonStatus ? false : true,
				},
			})
			.then((res) => {
				if (res.status == '204') {
					setbuttonStatus((item = item == 'locked' ? 'unlocked' : 'locked'));
					setbuttonStatusLoading(false);
				} else {
					return false;
				}
			});
	}

	function ButtonState() {
		if (buttonStatus == 'unlocked') {
			return { variant: 'success', icon: faUnlock };
		} else if (buttonStatus == 'locked') {
			return { variant: 'danger', icon: faLock };
		} else {
			return { variant: 'info', icon: faSpinner };
		}
	}

	// useEffect(() => {
	// 	getData(false);
	// }, [buttonStatus, buttonStatusLoading]);
	// }, []);

	return (
		<Button
			variant={ButtonState().variant}
			size="sm"
			disabled={buttonStatusLoading ? true : ''}
			onClick={() => {
				setbuttonStatusLoading(true);
				lockerHandler(arg._id, props.index);
			}}
		>
			{buttonStatusLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={ButtonState().icon} />}
		</Button>
	);
}
