import React, { useState, useEffect, useMemo, useContext, createContext } from 'react';
import dayjs from 'dayjs';
import ToggleCredentialsActiveButton from 'app/components/elements/buttons/admin/credentials/toggleCredentialsActiveButton';
import CredentialsDetailsModalButton from 'app/components/elements/buttons/admin/credentials/toggleCredentialsDetailsModalButton';
import AddMonthHandlerButton from 'app/components/elements/buttons/admin/credentials/credentialsAddMonthButton';
import Table from 'app/components/elements/tables/tableInstance/table';
import ActualSlotsInUse from 'app/components/common/credentialsTableElements/actualSlotsInUse';
import AccountExpiredIn from 'app/components/common/credentialsTableElements/accountExpiredIn';
import CopyString from 'app/components/modules/copyString';
import FriendlyID from 'app/components/modules/friendlyID';
import ToggleOrderDetailsModalButton from 'app/components/elements/buttons/admin/orders/toggleOrderDetailsModalButton';
export const CredentialsDataContext = createContext({
	credentialsData: [],
	setCredentialsData: () => {},
});

export default function AllOrdersTable({ orders }) {
	const [loadingData, setLoadingData] = useState(true);
	const [credsData, setCredsData] = useState([]);

	const [credentialsData, setCredentialsData] = useState(orders);
	const data = useMemo(() => ({ credentialsData, setCredentialsData }), [credentialsData]);

	useEffect(() => {
		let render = [];
		orders.forEach((item, index) => {
			render[index] = {
				id: <FriendlyID ID={item._id} />,
				email: (
					<>
						{item.user.email}
						<CopyString string={item.email} />
					</>
				),
				name: (
					<>
						{item.user.name}
						<CopyString string={item.name} />
					</>
				),
				productsCount: item.products.length,
				totalValue: item.totalValue + ' zł',
				source: item.orderSource,
				orderStatus: item.orderStatus,
				buttons: (
					<div className="d-flex justify-content-around">
						<ToggleOrderDetailsModalButton orderData={item} />
					</div>
				),
			};
		});
		setCredsData(render);
		setLoadingData(false);
	}, [orders, credentialsData]);

	const columns = useMemo(() => [
		{
			Header: 'ID',
			accessor: 'id',
		},
		{
			Header: 'Email',
			accessor: 'email',
		},
		{
			Header: 'Login',
			accessor: 'name',
		},
		{
			Header: 'Ile prod.',
			accessor: 'productsCount',
		},
		{
			Header: 'Wart. zam.',
			accessor: 'totalValue',
		},
		{
			Header: 'Źródło',
			accessor: 'source',
		},
		{
			Header: 'Status',
			accessor: 'orderStatus',
		},
		{
			Header: 'Przyciski',
			accessor: 'buttons',
		},
	]);

	return (
		<>
			{loadingData ? (
				<p>Ładowanie tabeli...</p>
			) : (
				<CredentialsDataContext.Provider value={data}>
					<Table columns={columns} data={credsData} />
				</CredentialsDataContext.Provider>
			)}
		</>
	);
}
