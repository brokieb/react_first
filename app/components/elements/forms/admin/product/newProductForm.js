import { useRef, useState } from "react";
import { Button, Form, Modal, ListGroup, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { Formik } from "formik";
import axiosInstance from "../../../../../../app/lib/axiosInstance";

export default function NewProductForm(props) {
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
        .number("To nie jest poprawna kwota")
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
    <Formik
      validationSchema={schema}
      enableReinitialize
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={(values) => {
        axiosInstance.post("/api/prods/postNewProduct", {
          params: {
            title: values.title,
            sku: values.sku,
            imageUrl: values.imageUrl,
            price: values.price,
            shortDescription: values.shortDescription,
            description: values.description,
            maxUsers: values.maxUsers,
          },
        });
      }}
      initialValues={{
        title: "",
        sku: "",
        imageUrl: "",
        price: "",
        shortDescription: "",
        description: "",
        maxUsers: "",
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
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
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
              <Form.Label className="mt-2 mb-0" htmlFor="imageUrl">
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Zamknij
            </Button>
            <Button type="submit" variant="success">
              Zapisz
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
}
