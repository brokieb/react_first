import { useEffect, useState } from "react";
import { Button, Modal, Form, Image, Row, Col, Ratio } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import axiosInstance from "app/lib/axiosInstance";
import dayjs from "dayjs";
export default function AuctionEditorForm({ auctionDetails }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(true);
  const [product, setProducts] = useState({ data: [] });
  const [prodId, setProdId] = useState("");
  const [usersMaxLen, setUsersMaxLen] = useState("");

  const schema = yup
    .object()
    .shape({
      login: yup.string().required("To pole jest obowiązkowe"),
      password: yup.string().required("To pole jest obowiązkowe"),
      usersMaxLen: yup
        .number("To nie jest poprawna liczba")
        .required("To pole jest obowiązkowe"),
    })
    .required();

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(data) => {
          console.log(data, "DATA AKCEPTIRE");
        }}
        initialValues={{
          category: auctionDetails.category.id,
          images: auctionDetails.images,
          name: auctionDetails.name,
          sellingFormat: auctionDetails.sellingMode.format,
          sellingPrice: auctionDetails.sellingMode.price.amount,
        }}
      >
        {({ errors, values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="category">
                Kategoria
              </Form.Label>
              <Form.Control
                value={values.category}
                onChange={handleChange}
                type="text"
                name="category"
                id="category"
                isInvalid={!!errors.category}
              />
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="name">
                Tytuł
              </Form.Label>
              <Form.Control
                value={values.name}
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="sellingFormat">
                Typ sprzedaży
              </Form.Label>
              <Form.Control
                value={values.sellingFormat}
                onChange={handleChange}
                type="text"
                name="sellingFormat"
                id="sellingFormat"
                isInvalid={!!errors.sellingFormat}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sellingFormat}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="sellingPrice">
                Cena
              </Form.Label>
              <Form.Control
                value={values.sellingPrice}
                onChange={handleChange}
                type="text"
                name="sellingPrice"
                id="sellingPrice"
                isInvalid={!!errors.sellingPrice}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sellingPrice}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex flex-row gap-2 pt-2 flex-wrap justify-content-around">
              {values.images.map((item, index) => {
                return (
                  <span key={index}>
                    <Image
                      src={item.url}
                      thumbnail
                      style={{ height: "150px" }}
                    />
                    {/* <Col>
                  <Form.Group>
                  <Form.Label className="mt-2 mb-0" htmlFor="sellingPrice">
                  Zdjęcie {index}
                  </Form.Label>
                  <Form.Control
                  value={item.url}
                  onChange={handleChange}
                  type="text"
                  name="images[]"
                  id={index}
                  isInvalid={!!errors.images}
                    />
                    <Form.Control.Feedback type="invalid">
                    {errors.images}
                    </Form.Control.Feedback>
                    </Form.Group>
                  </Col> */}
                  </span>
                );
              })}
              <span
                className="img-thumbnail d-flex justify-content-center align-items-center"
                style={{ width: "250px", height: "150px" }}
              >
                +
              </span>
              <span
                className="img-thumbnail d-flex justify-content-center align-items-center"
                style={{ width: "250px", height: "150px" }}
              >
                +
              </span>
              <span
                className="img-thumbnail d-flex justify-content-center align-items-center"
                style={{ width: "250px", height: "150px" }}
              >
                +
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
