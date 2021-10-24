import { Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CredentialsDetailsModal(props) {
	const [loadingData, setLoadingData] = useState(true);
	useEffect(() => {
		if (loadingData === false) {
			setLoadingData(true);
		}
	}, [props.credId]);

	const [readyData, setReadyData] = useState('');
	function getData() {
		axios
			.get('http://localhost:3000/api/getCredentials', {
				params: {
					_id: props.credId,
				},
			})
			.then((ans) => {
				console.log(ans);
				const creds = ans.data;
				setReadyData(<>Szcegóły konta {creds.email}</>);
				setLoadingData(false);
			});
	}

	useEffect(() => {
		getData();
	}, [props.credId]);

	return (
		<Modal onHide={props.handleClose} show={props.show}>
			<Modal.Header closeButton>
				<Modal.Title>Szczegóły konta</Modal.Title>
			</Modal.Header>
			<Modal.Body>{loadingData ? <p>Ładowanie</p> : readyData}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.handleClose}>
					Zamknij
				</Button>
				<Button type="submit" variant="success">
					Zapisz
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
