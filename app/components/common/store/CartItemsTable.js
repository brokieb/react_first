import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTable } from 'react-table';
import { useSession, signIn } from 'next-auth/react';
import { useCookies } from 'react-cookie';
import { faLock, faUnlock, faFolderOpen, faCalendarPlus, faUser, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
export default function CredentialsTableContent(props) {
	const { data: session } = useSession();
	const [cookies, setCookie] = useCookies(['cart']);
	const columns = React.useMemo(
		() => [
			{
				Header: 'Produkt',
				accessor: 'productId.title', // accessor is the "key" in the data
			},
			{
				Header: 'ilość miesięcy',
				accessor: 'quantity',
			},
			{
				Header: 'cena',
				accessor: 'productId.price',
				Footer: <>testtt</>,
			},
			{
				Header: 'Wartość',
				accessor: 'value',
				Footer: <>testtt</>,
			},
		],
		[],
	);
	const data = props.data;
	const readyData = React.useMemo(() => data, []);
	console.log(data);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

	return (
		<>
			<small>koszyk id: {session ? session.user.uid : cookies.cartId}</small>
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
									return (
										<td
											{...cell.getCellProps({
												className: cell.column.className,
											})}
										>
											{cell.render('Cell')}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
				<tfoot></tfoot>
			</Table>
		</>
	);
}