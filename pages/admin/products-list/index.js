import ProductsList from 'app/components/common/admin/ProductsList';
import axiosInstance from 'app/lib/axiosInstance';
import { useEffect, useState } from 'react';
import Loading from 'app/components/layout/Loading';
import { Button, Card } from 'react-bootstrap';

export default function Home(props) {
	const [readyData, setReadyData] = useState('');
	const [loadingData, setLoadingData] = useState(true);
	function getData() {
		axiosInstance.get('/api/prods/getProducts').then((ans) => {
			const data = ans.data;
			setReadyData(data);
			setLoadingData(false);
		});
	}
	useEffect(() => {
		getData();
	}, []);
	return (
		<>
			{loadingData ? (
				<Loading />
			) : (
				<div>
					<ProductsList products={readyData}></ProductsList>
				</div>
			)}
		</>
	);
}
