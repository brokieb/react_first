import react, { useState } from 'react';
import axiosInstance from 'app/lib/axiosInstance';
import AllOrdersTable from 'app/components/elements/tables/orders/allOrdersTable';
import Loading from 'app/components/layout/loading';
export default function Home() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	axiosInstance.get('/api/order/getAdminOrders').then((ans) => {
		setOrders(ans.data);
		setLoading(false);
	});
	return <>{loading ? <Loading /> : <AllOrdersTable orders={orders} />}</>;
}
