import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { useTable } from 'react-table';
import { Table } from 'react-bootstrap';
import Tr from 'app/components/elements/tables/tableInstance/tr';
import Empty from 'app/components/layout/empty';

export default function TableRender({ columns, data }) {
	const {
		getTableProps, // table props from react-table
		getTableBodyProps, // table body props from react-table
		headerGroups, // headerGroups, if your table has groupings
		rows, // rows for the table based on the data passed
		prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
	} = useTable({
		columns,
		data,
	});

	return (
		<>
			{data.length ? (
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
						{rows.map((row, i) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{
										// Loop over the rows cells
										row.cells.map((cell) => {
											// Apply the cell props
											return (
												<td {...cell.getCellProps()}>
													{
														// Render the cell contents
														cell.render('Cell')
													}
												</td>
											);
										})
									}
								</tr>
							);
						})}
					</tbody>
				</Table>
			) : (
				<Empty />
			)}
		</>
	);
}
