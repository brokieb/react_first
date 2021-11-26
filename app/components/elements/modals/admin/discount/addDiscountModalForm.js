import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import * as yup from 'yup';
import axiosInstance from 'app/lib/axiosInstance';
import NewCredentialsForm from 'app/components/elements/forms/admin/credentials/newCredentialsForm';
import NewDiscountForm from 'app/components/elements/forms/admin/discounts/newDiscountForm';
export default function AddDiscountModalForm(props) {
	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Dodaj kod</Modal.Title>
			</Modal.Header>
			<NewDiscountForm hideModal={props.handleClose} />
		</Modal>
	);
}
