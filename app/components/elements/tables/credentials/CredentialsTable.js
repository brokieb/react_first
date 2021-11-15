import React, { useState, useEffect, useMemo } from 'react';
import axiosInstance from 'app/lib/axiosInstance';

import ToggleCredentialsActiveButton from 'app/components/elements/buttons/admin/credentials/ToggleCredentialsActiveButton';
import CredentialsDetailsModalButton from 'app/components/elements/buttons/admin/credentials/ToggleCredentialsDetailsModalButton';
import AddMonthHandlerButton from 'app/components/elements/buttons/admin/credentials/CredentialsAddMonthButton';
import Table from 'app/components/elements/tables/table';

import ActualSlotsInUse from 'app/components/common/CredentialsTableElements/ActualSlotsInUse';
import AccountExpiredIn from 'app/components/common/CredentialsTableElements/AccountExpiredIn';
export default function CredentialsTableContent(props) {
	const [loadingData, setLoadingData] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		axiosInstance.get('/api/creds/getCredentials').then((ans) => {
			ans.data.forEach((arg, index) => {
				arg['buttonsRender'] = (
					<div className="d-flex justify-content-around">
						<ToggleCredentialsActiveButton arg={arg} />
						<CredentialsDetailsModalButton credId={arg._id} />
						<AddMonthHandlerButton credId={arg._id} />
					</div>
				);
				arg['usersRender'] = (
					<div className="d-flex justify-content-around">
						<ActualSlotsInUse maxUsers={arg.usersMaxLen} nowUsers={arg.usersLen} />
					</div>
				);
				arg['skuRender'] = arg.productId.SKU;
				arg['expiredInRender'] = <AccountExpiredIn date={arg.expiredIn} />;
				arg['commentRender'] = arg['comment'];
			});
			setLoadingData(false);
			setData(ans.data);
		});
	}, []);

	const columns = useMemo(() => [
		{
			Header: 'Email',
			accessor: 'email',
		},
		{
			Header: 'Hasło',
			accessor: 'password',
		},
		{
			Header: 'Symbol',
			accessor: 'skuRender',
		},
		{
			Header: 'Aktywne do',
			accessor: 'expiredInRender',
		},
		{
			Header: 'Komentarz',
			accessor: 'commentRender',
		},
		{
			Header: 'uzytkownicy',
			accessor: 'usersRender',
		},
		{
			Header: 'Komentarz',
			accessor: 'buttonsRender',
		},
	]);

	return <>{loadingData ? <p>Ładowanie tabeli...</p> : <Table columns={columns} data={data} />}</>;
}
