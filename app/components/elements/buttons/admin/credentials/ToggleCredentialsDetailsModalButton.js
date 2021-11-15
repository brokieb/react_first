import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CredentialsDetailsModal from '../../../modals/admin/credentials/CredentialsDetailsModal';
export default function CredentialsDetailsModalButton(props) {
	const [showCredentialsDetailsModal, setShowCredentialsDetailsModal] = useState(false);
	const [showModalInit, setShowModalInit] = useState(false);

	return (
		<>
			<Button
				className="btn btn-sm btn-primary"
				onClick={() => {
					setShowModalInit(true);
					setShowCredentialsDetailsModal(true);
				}}
			>
				<FontAwesomeIcon icon={faFolderOpen} />
			</Button>
			{showModalInit ? (
				<CredentialsDetailsModal
					show={showCredentialsDetailsModal}
					handleClose={() => {
						console.log('XDDD');
						setShowCredentialsDetailsModal(false);
					}}
					credId={props.credId}
				></CredentialsDetailsModal>
			) : (
				<></>
			)}
		</>
	);
}
