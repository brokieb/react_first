import React from 'react';
import { Button } from 'react-bootstrap';
import AddCredentialsForm from 'app/components/elements/forms/admin/credentials/AddCredentialsForm';
import CredentialsTable from 'app/components/elements/tables/credentials/CredentialsTable';

export default function Home() {
	return (
		<div className="d-flex justify-content-between w-100 flex-column">
			<div>
				<AddCredentialsForm />
			</div>
			<CredentialsTable />
		</div>
	);
}
