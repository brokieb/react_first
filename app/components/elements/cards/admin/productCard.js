import { Card, Button, Form } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import EditProductFormModal from "../../modals/admin/product/productDetailsModal";

export default function ProductCard({ product }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Card
      style={{ width: "18rem" }}
      className={!product.settings.active ? "border-danger m-2" : "m-2"}
      key={product._id}
    >
      <Link href={"/store/product/" + product._id}>
        <Card.Img
          variant="top"
          src={product.imageUrl}
          alt={product.imageUrl}
          style={{ cursor: "pointer" }}
        />
      </Link>
      <Card.Body className="d-flex flex-column justify-content-between pt-1">
        <div>
          <Link href={"/store/product/" + product._id}>
            <a className="link-primary card-title h5">{product.title}</a>
          </Link>
          <Card.Text>{product.shortDescription}</Card.Text>
        </div>
        <div className="d-flex justify-content-around align-items-center">
          <div className="gap-2 d-flex">
            <Button variant="outline" onClick={handleShow}>
              <FontAwesomeIcon size="lg" icon={faEdit} />
            </Button>
          </div>
          <h4 className="m-0 cursor-pointer">{product.price} zł</h4>
        </div>
      </Card.Body>
      <EditProductFormModal
        show={show}
        handleClose={handleClose}
        product={product}
      ></EditProductFormModal>
    </Card>
  );
}
