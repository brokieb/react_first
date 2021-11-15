import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { faLock, faUnlock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from 'app/lib/axiosInstance';

export default function ToggleCredentialsActive(props) {
	const [buttonStatus, setbuttonStatus] = useState('loading');
	useEffect(() => {
		setbuttonStatus(props.arg.active ? 'unlocked' : 'locked');
	}, []);

	async function lockerHandler(status, state) {
		axiosInstance
			.put('/api/creds/putEditCredentials', {
				params: {
					id: props.arg._id,
					newStatus: status,
				},
			})
			.then((res) => {
				if (res.status == '200') {
					setbuttonStatus(state);
				} else {
					return false;
				}
			});
	}

	function ButtonState() {
		switch (buttonStatus) {
			case 'locked':
				return (
					<Button
						variant="danger"
						size="sm"
						onClick={() => {
							setbuttonStatus('loading');
							lockerHandler('true', 'unlocked');
						}}
					>
						<FontAwesomeIcon icon={faLock} />
					</Button>
				);
			case 'unlocked':
				return (
					<Button
						variant="success"
						size="sm"
						onClick={() => {
							setbuttonStatus('loading');
							lockerHandler('false', 'locked');
						}}
					>
						<FontAwesomeIcon icon={faUnlock} />
					</Button>
				);
			default:
				return (
					<Button variant="warning" size="sm" disabled>
						<FontAwesomeIcon icon={faSpinner} spin />
					</Button>
				);
		}
	}

	return <ButtonState />;
}
