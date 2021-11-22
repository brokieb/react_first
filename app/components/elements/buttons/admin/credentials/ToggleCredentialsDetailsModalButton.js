import React, { useState, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalShow } from 'pages/admin/credentials';
import { ModalDataIndex } from 'pages/admin/credentials';
export default function CredentialsDetailsModalButton({ credId }) {
	const [showModalInit, setShowModalInit] = useState(false);
	const [reload, setReload] = useState(false);

	const { modalShow, setModalShow } = useContext(ModalShow);
	const { modalIndex, setModalIndex } = useContext(ModalDataIndex);
	return (
		<>
			<Button
				size="sm"
				variant="primary"
				onClick={() => {
					setModalIndex(credId);
					setModalShow(true);
				}}
			>
				<FontAwesomeIcon icon={faFolderOpen} />
			</Button>
		</>
	);
}
