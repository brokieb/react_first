import { useRef, useState, useContext } from "react";
import {
  Button,
  Form,
  Modal,
  ListGroup,
  Tab,
  Col,
  Row,
  Image,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { Formik } from "formik";
import axiosInstance from "../../../../../../app/lib/axiosInstance";
import PopAlert from "../../../../../../app/components/modules/popAlert";
import { ProductsDataContext } from "../../../../../../pages/admin/products-list";

export default function EditProductForm({ productData }) {
  const [status, setStatus] = useState(0);
  const [alertData, setAlertData] = useState({});
  const { ProductsData, setProductsData } = useContext(ProductsDataContext);

  const schema = yup
    .object()
    .shape({
      title: yup.string().required("To pole jest obowiązkowe"),
      sku: yup.string().required("To pole jest obowiązkowe"),
      imageUrl: yup
        .string()
        .url("To nie jest poprawny adres URL")
        .required("To pole jest obowiązkowe"),
      price: yup
        .number("To nie jest poprawna kwota, używaj kropki")
        .required("To pole jest obowiązkowe"),
      shortDescription: yup.string().required("To pole jest obowiązkowe"),
      description: yup.string().required("To pole jest obowiązkowe"),
      maxUsers: yup.number("asd").required("asdasd"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  return (
    <>
      <Formik
        validationSchema={schema}
        enableReinitialize
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values) => {
          axiosInstance
            .put("/api/prods/putEditProduct", {
              params: {
                id: productData._id,
                title: values.title,
                sku: values.sku,
                imageUrl: values.imageUrl,
                price: values.price,
                shortDescription: values.shortDescription,
                description: values.description,
                maxUsers: values.maxUsers,
              },
            })
            .then((ans) => {
              setProductsData((item) => {
                return item.map((item, index) => {
                  if (item._id == productData._id) {
                    item.title = values.title;
                    item.sku = values.sku;
                    item.imageUrl = values.imageUrl;
                    item.price = values.price;
                    item.shortDescription = values.shortDescription;
                    item.description = values.description;
                    item.settings.usersPerAccount = values.maxUsers;
                  }
                  return item;
                });
              });
              setAlertData({
                variant: "success",
                title: "Sukces",
                body: "Poprawnie zaktualizowano produkt",
                cb: () => {
                  setAlertData({});
                },
              });
            })
            .catch((err) => {
              setAlertData({
                variant: "danger",
                title: "danger",
                body: {
                  default: "Wystąpił bład przy edycji produktu",
                },
                cb: () => {
                  setAlertData({});
                },
              });
            });
        }}
        initialValues={{
          title: productData.title,
          sku: productData.SKU,
          imageUrl: productData.imageUrl,
          price: productData.price,
          shortDescription: productData.shortDescription,
          description: productData.description,
          maxUsers: productData.settings.usersPerAccount,
        }}
      >
        {({
          errors,
          values,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit} id="editProductForm">
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="title">
                Tytuł
              </Form.Label>
              <Form.Control
                value={values.title}
                type="text"
                name="title"
                id="title"
                isInvalid={!!errors.title}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="sku">
                Symbol
              </Form.Label>
              <Form.Control
                value={values.sku}
                type="text"
                name="sku"
                id="sku"
                isInvalid={!!errors.sku}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sku}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Row className="mt-2">
                <Col xs={12} sm={8}>
                  <Form.Label className="m-0" htmlFor="imageUrl">
                    Zdjęcie
                  </Form.Label>
                  <Form.Control
                    value={values.imageUrl}
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    isInvalid={!!errors.imageUrl}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.imageUrl}
                  </Form.Control.Feedback>
                </Col>
                <Col xs={12} sm={4}>
                  <Image src={values.imageUrl} alt={values.title} thumbnail />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="price">
                Cena
              </Form.Label>
              <Form.Control
                value={values.price}
                type="decimal"
                id="price"
                name="price"
                isInvalid={!!errors.price}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="maxUsers">
                Maks. Użytkowników
              </Form.Label>
              <Form.Control
                value={values.maxUsers}
                type="decimal"
                id="maxUsers"
                name="maxUsers"
                isInvalid={!!errors.maxUsers}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.maxUsers}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="shortDescription">
                Krótki opis
              </Form.Label>
              <Form.Control
                value={values.shortDescription}
                name="shortDescription"
                as="textarea"
                id="shortDescription"
                rows="5"
                isInvalid={!!errors.shortDescription}
                onChange={handleChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.shortDescription}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="description">
                Opis
              </Form.Label>
              <Form.Control
                value={values.description}
                name="description"
                as="textarea"
                id="description"
                rows="5"
                isInvalid={!!errors.description}
                onChange={handleChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        )}
      </Formik>
      <PopAlert data={alertData} />
    </>
  );
}
