import OrderHistoryCard from 'app/components/elements/cards/user/orderHistoryCard';
import axiosInstance from 'app/lib/axiosInstance';

import { useEffect, useState } from 'react';
import Loading from 'app/components/layout/loading';
export default function Home(props) {
	const [readyData, setReadyData] = useState(false);
	const [loading, setLoading] = useState(true);

	async function getData() {
		const data = await axiosInstance.get('/api/order/getOrders', {
			params: {
				_id: null,
				sort: { createdAt: 'asc' },
			},
		});

		setReadyData(
			data.data.map((item, index) => {
				return <OrderHistoryCard key={index} order={item}></OrderHistoryCard>;
			}),
		);
		setLoading(false);
	}
	useEffect(() => {
		getData();
	}, []);
	return loading ? <Loading /> : <div className="w-50 d-flex flex-column gap-2">{readyData}</div>;
}
