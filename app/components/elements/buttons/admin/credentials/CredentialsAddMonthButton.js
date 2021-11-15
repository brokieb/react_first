import React, { useState, useContext } from 'react';
import axiosInstance from 'app/lib/axiosInstance';
import { Button } from 'react-bootstrap';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function AddMonthHandlerButton(props) {
	const [showCredentialsDetailsModal, setShowCredentialsDetailsModal] = useState(false);
	const [showModalInit, setShowModalInit] = useState(false);
	const value = useContext(PageContext);
	console.log(value, '<-');
	// console.log(value, '<---');
	function addMonthHandler() {
		axiosInstance
			.put('/api/creds/putEditCredentials', {
				params: {
					id: props.credId,
					expiredInAddDays: 30,
				},
			})
			.then((res) => {
				if (res.status == '204') {
					setbuttonStatus(state);
				} else {
					return false;
				}
			});
	}

	return (
		<>
			<div>--2 3--asd</div>
			<Button
				className="btn btn-sm btn-secondary"
				onClick={() => {
					addMonthHandler();
				}}
			>
				<FontAwesomeIcon icon={faCalendarPlus} />
			</Button>
		</>
	);
}
