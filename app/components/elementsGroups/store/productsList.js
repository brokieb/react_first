import ProductCard from "../../../../app/components/elements/cards/store/productCard";

function ProductsList(props) {
  return (
    <div className="d-flex flex-wrap justify-content-around">
      {props.products.map((product) => (
        <ProductCard
          product={product}
          editMode={props.editMode}
          key={product._id}
        />
      ))}
    </div>
  );
}

export default ProductsList;
