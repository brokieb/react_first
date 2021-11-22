import ProductsList from 'app/components/common/admin/productsList';
import axiosInstance from 'app/lib/axiosInstance';
import { useEffect, useState, createContext } from 'react';
import Loading from 'app/components/layout/loading';

export const ProductsDataContext = createContext({
	ProductsData: [],
	setProductsData: () => {},
});

export default function Home(props) {
	const [ProductsData, setProductsData] = useState([]);
	const products = useMemo(() => ({ ProductsData, setProductsData }), [ProductsDataContext]);

	const [loadingData, setLoadingData] = useState(true);

	useEffect(() => {
		axiosInstance.get('/api/prods/getProducts').then((ans) => {
			const data = ans.data;
			setProductsData(data);
			setLoadingData(false);
		});
	}, []);
	return (
		<>
			{loadingData ? (
				<Loading />
			) : (
				<div>
					<ProductsList products={ProductsData}></ProductsList>
				</div>
			)}
		</>
	);
}
