import Card from "react-bootstrap/Card";
import Link from "next/link";
import AddToCardButton from "../../buttons/store/addToCardButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import ProductDiscountPrice from "../../../elementsGroups/store/productDiscountPrice";

function ProductCard({ product }) {
  return (
    <Card style={{ width: "18rem" }} className="m-2" key={product._id}>
      {product.oldPrice && (
        <div
          className="position-absolute bg-danger d-flex justify-content-center align-items-center rounded-circle"
          style={{ width: "50px", height: "50px", left: "-10px", top: "-10px" }}
        >
          <FontAwesomeIcon size="2x" icon={faPercent} className="text-light" />
        </div>
      )}
      <Link href={"/store/product/" + product._id}>
        <Card.Img
          variant="top"
          src={product.imageUrl}
          alt={product.imageUrl}
          style={{ cursor: "pointer", height: "150px", objectFit: "cover" }}
        />
      </Link>
      <Card.Body
        className="d-flex flex-column justify-content-between"
        style={{ height: "200px" }}
      >
        <div>
          <Link href={"/store/product/" + product._id}>
            <a className="link-primary card-title h5">{product.title}</a>
          </Link>
          <Card.Text>{product.shortDescription}</Card.Text>
        </div>
        <div className="d-flex justify-content-around align-items-center">
          <div className="gap-2 d-flex">
            <AddToCardButton _id={product._id} />
          </div>
          <div>
            {product.oldPrice && (
              <s className="m-0 text-danger">{product.oldPrice} zł</s>
            )}
            <h4 className="m-0 text-primary">{product.price} zł</h4>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
