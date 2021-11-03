import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTable } from 'react-table';
import { faLock, faFolderOpen, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import CredentialsDetailsModal from '../credentials/CredentialsDetailsModal';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

export default function CredentialsTableContent(props) {
	const [loadingData, setLoadingData] = useState(true);
	const [data, setData] = useState([]);
	const [showCredentialsDetailsModal, setShowCredentialsDetailsModal] = useState(false);
	const [InitialShowModal, setInitialShowModal] = useState(false);
	const [ModalCredentialsId, setModalCredentialsId] = useState(false);

	const handleCloseCredentialsDetailsModal = () => {
		console.log('chowam element');
	};
	const handleShowCredentialsDetailsModal = () => setShowCredentialsDetailsModal(true);

	useEffect(() => {
		function getData() {
			axios
				.get('http://localhost:3000/api/getProducts', {
					params: {
						_id: props.productId,
					},
				})
				.then((ans) => {
					const readyArray = [];
					ans.data.credentials.forEach((arg, index) => {
						console.log(arg.credentialsId);
						arg.credentialsId['dis'] = '123';
						arg.credentialsId['buttons'] = (
							<div className="d-flex justify-content-around">
								<Button className="btn btn-sm btn-danger">
									<FontAwesomeIcon icon={faLock} />
								</Button>
								<Button
									className="btn btn-sm btn-primary"
									onClick={function () {
										if (!InitialShowModal) {
											setInitialShowModal(true);
										}
										setModalCredentialsId(arg._id);
										handleShowCredentialsDetailsModal();
									}}
								>
									<FontAwesomeIcon icon={faFolderOpen} />
								</Button>
								<Button className="btn btn-sm btn-secondary">
									<FontAwesomeIcon icon={faCalendarPlus} />
								</Button>
							</div>
						);
						readyArray.push(arg.credentialsId);
					});
					console.log(readyArray);
					setData(readyArray);
					setLoadingData(false);
				});
		}
		if (loadingData) {
			getData();
		}
	}, []);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Email',
				accessor: 'email', // accessor is the "key" in the data
			},
			{
				Header: 'Hasło',
				accessor: 'password',
			},
			{
				Header: 'Aktywne do',
				accessor: 'expiredIn',
			},
			{
				Header: 'Komentarz',
				accessor: 'comment',
			},
			{
				Header: 'Komentarz',
				accessor: 'buttons',
			},
		],
		[],
	);
	const readyData = React.useMemo(() => data, []);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

	return (
		<>
			{loadingData ? (
				<p>Ładowanie tabeli...</p>
			) : (
				<Table striped bordered hover size="sm" {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>{column.render('Header')}</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
				</Table>
			)}
			{InitialShowModal ? (
				<CredentialsDetailsModal
					show={showCredentialsDetailsModal}
					handleClose={() => {
						setShowCredentialsDetailsModal(false);
					}}
					credId={ModalCredentialsId}
				></CredentialsDetailsModal>
			) : (
				<></>
			)}
		</>
	);
}