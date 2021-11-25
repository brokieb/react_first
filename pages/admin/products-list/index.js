import { useEffect, useState, createContext, useMemo } from 'react';
import ProductsList from 'app/components/common/admin/productsList';
import axiosInstance from 'app/lib/axiosInstance';
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

	function RenderProductsList() {
		return <ProductsList products={ProductsData}></ProductsList>;
	}

	useEffect(() => {
		RenderProductsList();
	}, [ProductsData]);
	return (
		<>
			{loadingData ? (
				<Loading />
			) : (
				<div>
					<ProductsDataContext.Provider value={products}>
						<RenderProductsList />
					</ProductsDataContext.Provider>
				</div>
			)}
		</>
	);
}
