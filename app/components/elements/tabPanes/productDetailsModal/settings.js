import { useRef, useState, useEffect } from "react";
import { Button, Modal, Form, ListGroup, Tab, Row, Col } from "react-bootstrap";
import EditProductForm from "../../../../../app/components/elements/forms/admin/product/editProductForm";
import DeleteProductButton from "../../../../../app/components/elements/buttons/admin/product/deleteProductButton";
import ToggleActiveProduct from "../../../../../app/components/elements/buttons/admin/product/toggleActiveProduct";
import DiscountProductForm from "../../../../../app/components/elements/forms/admin/product/discountProductForm";
export default function SettingsPane(props) {
  const [loadingCredsTable, setLoadingCredsTable] = useState(true);
  const product = props.product;
  return (
    <>
      <Row>
        <Col>
          <EditProductForm productData={product} />
        </Col>
        <Col>
          <div className="d-flex justify-content-evenly">
            <ToggleActiveProduct prodId={product._id} />
            <DeleteProductButton
              prodId={product._id}
              onSuccess={props.handleClose}
            />
          </div>
          <hr className="mx-5" />
          <div className="mx-5">
            <DiscountProductForm productData={product} />
          </div>
          <hr className="mx-5" />
        </Col>
      </Row>
    </>
  );
}
