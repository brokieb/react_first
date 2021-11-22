import ProductDetails from 'app/components/common/store/productDetails';
import axiosInstance from 'app/lib/axiosInstance';
export default function Home(props) {
	return <ProductDetails product={props.product}></ProductDetails>;
}

export async function getServerSideProps(context) {
	const productId = context.params.productId;

	const data = await axiosInstance.get('api/prods/getProducts', {
		params: {
			_id: productId,
		},
	});
	return {
		props: {
			product: data.data,
		},
	};
}
