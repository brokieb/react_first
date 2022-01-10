import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

import * as yup from "yup";

function NewClientForm(props) {
  const schema = yup
    .object()
    .shape({
      name: yup.string().required("To pole jest obowiązkowe"),
      email: yup
        .string()
        .email("To nie jest prawidłowy adres email")
        .required("To pole jest obowiązkowe"),
      password: yup.string().required("To pole jest obowiązkowe"),
      password_r: yup
        .string()
        .oneOf([yup.ref("password"), null], "hasla musza byc takie same"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    props.onAddClient(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="col-6">
      <Form.Group>
        <Form.Label htmlFor="name">Imię</Form.Label>
        <Form.Control
          type="text"
          id="name"
          {...register("name")}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          type="text"
          id="email"
          {...register("email")}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Haslo</Form.Label>
        <Form.Control
          type="password"
          id="password"
          {...register("password")}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password_r">Powtórz hasło</Form.Label>
        <Form.Control
          type="password"
          id="password_r"
          {...register("password_r")}
          isInvalid={!!errors.password_r}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password_r?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="pt-2">
        <Button variant="primary" type="submit">
          Załóż konto
        </Button>
      </div>
    </Form>
  );
}

export default NewClientForm;
