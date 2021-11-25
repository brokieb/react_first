import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
export default function ToggleActiveProduct() {
	return (
		<Button variant="success" size="sm" onClick={() => {}}>
			<FontAwesomeIcon icon={faUnlock} />
		</Button>
	);
}
