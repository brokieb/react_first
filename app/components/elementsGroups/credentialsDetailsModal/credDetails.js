import { Button, Modal, Nav, Col, Tab, Row, ListGroup, CloseButton, Alert } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { faCopy, faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from 'app/lib/axiosInstance';
import CredentialsChangePasswordForm, {
	genCredentialsHandler,
} from 'app/components/elements/forms/admin/credentials/credentialsChangePasswordForm';
import ToggleCredentialsActiveButton from 'app/components/elements/buttons/admin/credentials/toggleCredentialsActiveButton';
import AddMonthHandlerButton from 'app/components/elements/buttons/admin/credentials/credentialsAddMonthButton';
import ActiveCredentialsUserTable from 'app/components/elements/tables/credentials/activeCredentialsUserTable';
import CopyString from 'app/components/modules/copyString';
import dayjs from 'dayjs';
export default function credDetails(props) {
	return (
		<>
			{props.cred.users.length != props.cred.usersLen ? (
				<Alert variant="danger">
					Ilość osób na koncie nie zgadza się z zadeklarowaną liczbą, na koncie jest:{' '}
					<strong>{props.cred.users.length}</strong>, zadeklarowane:{' '}
					<strong>{props.cred.usersLen}</strong>. W celu naprawienia tego błędu,{' '}
					<a
						href="#"
						onClick={() => {
							console.log('REPAIR FORM credDetails.js');
						}}
					>
						KLIKNIJ TUTAJ
					</a>
					, wtedy ustawię licznik użytkowników na poprawną liczbę
				</Alert>
			) : (
				<></>
			)}
			<div className="d-flex justify-content-evenly">
				<ToggleCredentialsActiveButton credId={props.cred._id} />
				<AddMonthHandlerButton credId={props.cred._id} />
			</div>
			<hr className="mx-5" />
			<ul>
				<li>
					email: <strong>{props.cred.email}</strong>
					<CopyString string={props.cred.email} />
				</li>
				<li>
					Hasło: <strong>{props.cred.password}</strong>
					<CopyString string={props.cred.password} />
				</li>
				<li>
					Aktywne do: <strong>{dayjs(props.cred.expiredIn).format('DD/MM/YYYY')}</strong>
				</li>
				<li>
					Ostatnia aktualizacja:{' '}
					<strong>{dayjs(props.cred.updatedAt).format('DD/MM/YYYY HH:mm:ss')}</strong>
				</li>
				<li>
					użytkownicy:{' '}
					<strong>
						{props.cred.usersLen}/{props.cred.usersMaxLen}
					</strong>
				</li>
			</ul>
			<hr className="mx-5" />
			<div className="border d-flex flex-row mx-3 p-2 gap-3">
				<img src={props.cred.productId.imageUrl} style={{ height: '60px' }}></img>
				<div>
					<strong>{props.cred.productId.title}</strong>
					<small className="ps-2">{props.cred.productId.SKU}</small>
					<p>{props.cred.productId.price} zł</p>
				</div>
			</div>
		</>
	);
}
