import React from 'react';
import { Button } from 'react-bootstrap';
import AddCredentialsForm from '../../../components/admin/credentials/AddCredentialsForm';
import CredentialsTableContent from '../../../components/admin/credentials/CredentialsTableContent';

export default function Home() {
	return (
		<div className="d-flex justify-content-between w-100 flex-column">
			<div className="d-flex gap-2">
				<AddCredentialsForm />
				<Button variant="secondary" className="my-2">
					?
				</Button>
				<Button variant="danger" className="my-2">
					? ?
				</Button>
			</div>
			<div>
				<CredentialsTableContent />
			</div>
		</div>
	);
}
