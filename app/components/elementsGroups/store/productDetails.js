import { Image, Button, Row, Col } from "react-bootstrap";
import AddToCardButton from "../../../../app/components/elements/buttons/store/addToCardButton";
export default function ProductDetails({ product }) {
  return (
    <Row>
      <Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 1 }}>
        <small className="text-muted">Symbol: {product.SKU}</small>
        <div className="text-start">
          <h1>{product.title}</h1>
          <p className="fw-bold">{product.shortDescription}</p>
          <p className="ps-3">{product.description}</p>
        </div>
      </Col>
      <Col
        xs={{ span: 12, order: 1 }}
        md={{ span: 6, order: 2 }}
        className="d-flex flex-column gap-2 mx-auto"
        style={{ maxWidth: "350px" }}
      >
        <Image src={product.imageUrl} rounded className="w-100" />
        <div className="d-flex justify-content-around align-items-center w-100">
          <div>
            {product.oldPrice && (
              <s className="m-0 text-danger">{product.oldPrice} zł</s>
            )}
            <h4 className="m-0 text-success">{product.price} zł</h4>
          </div>
          <div>
            <AddToCardButton _id={product._id} />
          </div>
        </div>
      </Col>
    </Row>
  );
}
