import { Image, Button } from "react-bootstrap";
import ProductDiscountPrice from "./productDiscountPrice";
export default function ProductDetails({ product }) {
  return (
    <div className="row justify-content-between">
      <div className="col-6">
        <small>Symbol: {product.SKU}</small>
        <h1>{product.title}</h1>
        <p className="ps-3 col-10">{product.description}</p>
        <div className="d-flex justify-content-around align-items-center">
          <div>
            {product.oldPrice && (
              <s className="m-0 text-danger">{product.oldPrice} zł</s>
            )}
            <h4 className="m-0 text-success">{product.price} zł</h4>
          </div>
          <div>
            <Button variant="success">Kup teraz!</Button>
          </div>
        </div>
      </div>
      <div className="col-6">
        <Image src={product.imageUrl} className="w-100" rounded />
      </div>
    </div>
  );
}
