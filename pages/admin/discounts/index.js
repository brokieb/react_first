import React, { createContext, useState, useMemo, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import AddDiscountOpenModalFormButton from 'app/components/elements/buttons/admin/discount/addDiscountOpenModalFormButton';
import CredentialsTable from 'app/components/elements/tables/credentials/credentialsTableContent';
import CredentialsDetailsModal from 'app/components/elements/modals/admin/credentials/credentialsDetailsModal';
import axiosInstance from 'app/lib/axiosInstance';
import Loading from 'app/components/layout/loading';
import AllDiscountsTable from 'app/components/elements/tables/discounts/allDiscountsTable';

export default function Home() {
	const [discountsData, setDiscountsData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axiosInstance.get('/api/discount/getDiscounts').then((ans) => {
			setDiscountsData(ans.data.data);
			setLoading(false);
		});
	}, []);

	return (
		<div className="d-flex justify-content-between w-100 flex-column">
			<div>
				<AddDiscountOpenModalFormButton />
			</div>

			{loading ? <Loading /> : <AllDiscountsTable discounts={discountsData} />}
		</div>
	);
}
