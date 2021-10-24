import ProductCard from './ProductCard';

function ProductsList(props) {
	return (
		<div className="d-flex flex-wrap justify-content-around">
			{props.products.map((product) => (
				<ProductCard
					editMode={props.editMode}
					key={product._id}
					_id={product._id}
					imageUrl={product.imageUrl}
					title={product.title}
					description={product.description}
					price={product.price}
				/>
			))}
		</div>
	);
}

export default ProductsList;
