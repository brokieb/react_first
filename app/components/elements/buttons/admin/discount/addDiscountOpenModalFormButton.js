import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AddDiscountModalForm from 'app/components/elements/modals/admin/discount/addDiscountModalForm';
import axios from 'axios';
export default function AddDiscountOpenModalFormButton() {
	const [showAddCredentialsModal, setShowAddCredentialsModal] = useState(false);
	const handleCloseAddCredentialsModal = () => setShowAddCredentialsModal(false);
	const handleShowAddCredentialsModal = () => setShowAddCredentialsModal(true);

	function addCredentialsHandler(data) {
		axiosInstance
			.post('/api/creds/postNewCredentials', {
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
				} else {
				}
			});
	}
	return (
		<>
			<Button className="my-2" onClick={handleShowAddCredentialsModal}>
				Dodaj kod
			</Button>
			<AddDiscountModalForm
				onAddCredentials={addCredentialsHandler}
				show={showAddCredentialsModal}
				handleClose={handleCloseAddCredentialsModal}
			></AddDiscountModalForm>
		</>
	);
}
