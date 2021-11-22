import { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { faLock, faUnlock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from 'app/lib/axiosInstance';
import { CredentialsDataContext } from 'pages/admin/credentials/index';
import GetIndex from 'app/components/modules/getIndex';
export default function ToggleCredentialsActive({ credId }) {
	const [index, setIndex] = useState('');
	const [loading, setLoading] = useState(true);
	const { credentialsData, setCredentialsData } = useContext(CredentialsDataContext);
	useEffect(() => {
		setIndex(GetIndex(credentialsData, credId));
		setLoading(false);
	}, [credId]);

	// useEffect(() => {
	// 	setLoading(false);
	// }, [credentialsData]);

	async function lockerHandler(status, state) {
		axiosInstance
			.put('/api/creds/putEditCredentials', {
				params: {
					id: credId,
					newStatus: status,
				},
			})
			.then((res) => {
				if (res.status == '200') {
					setCredentialsData((item) => {
						return item.map((item, index) => {
							if (item._id == credId) {
								item.active = status;
							}
							return item;
						});
					});
					setLoading(false);
				} else {
					return false;
				}
			});
	}

	function ButtonState() {
		switch (credentialsData[index].active.toString()) {
			case 'false':
				return (
					<Button
						variant="danger"
						size="sm"
						onClick={() => {
							setLoading(true);
							lockerHandler('true', 'unlocked');
						}}
					>
						<FontAwesomeIcon icon={faLock} />
					</Button>
				);
			case 'true':
				return (
					<Button
						variant="success"
						size="sm"
						onClick={() => {
							setLoading(true);
							lockerHandler('false', 'locked');
						}}
					>
						<FontAwesomeIcon icon={faUnlock} />
					</Button>
				);
			default:
				return <>?-{credentialsData[index].active}-3</>;
		}
	}

	return (
		<>
			{loading ? (
				<Button variant="warning" size="sm" disabled>
					<FontAwesomeIcon icon={faSpinner} spin />
				</Button>
			) : (
				<ButtonState />
			)}
		</>
	);
}
