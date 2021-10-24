import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import NewCredentialsFormModal from './NewCredentialsFormModal';
import axios from 'axios';
export default function AddCredentialsForm() {
	const [showAddCredentialsModal, setShowAddCredentialsModal] = useState(false);
	const handleCloseAddCredentialsModal = () => setShowAddCredentialsModal(false);
	const handleShowAddCredentialsModal = () => setShowAddCredentialsModal(true);

	function addCredentialsHandler(data) {
		console.log(data, 'odebrałem');
		axios
			.post('/api/postNewCredentials', {
				headers: {
					'Content-Type': 'application/json',
				},
				params: {
					email: data.email,
					password: data.password,
					expiredIn: data.expiredIn,
					comment: data.comment,
					active: data.active,
					productId: data.productId,
				},
			})
			.then((res) => {
				if (res.status == '201') {
					console.log('poprawnie dodano :)', res);
				} else {
					console.log('blad');
				}
			});
	}
	return (
		<>
			<Button className="my-2" onClick={handleShowAddCredentialsModal}>
				Dodaj konto
			</Button>
			<NewCredentialsFormModal
				onAddCredentials={addCredentialsHandler}
				show={showAddCredentialsModal}
				handleClose={handleCloseAddCredentialsModal}
			></NewCredentialsFormModal>
		</>
	);
}
