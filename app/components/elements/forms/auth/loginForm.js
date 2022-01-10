import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { Formik } from "formik";
import axiosInstance from "../../../../lib/axiosInstance";
import PopAlert from "../../../modules/popAlert";

export default function LoginForm({ csrfToken }) {
  const [alertData, setAlertData] = useState({});
  const router = useRouter();
  const schema = yup
    .object()
    .shape({
      email: yup
        .string()
        .email("To nie jest prawidłowy adres email")
        .required("To pole jest obowiązkowe"),
      password: yup.string().required("To pole jest obowiązkowe"),
    })
    .required();

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          axiosInstance
            .post("/api/auth/callback/credentials", values)
            .then((item) => {
              setAlertData({
                variant: "success",
                title: "Sukces",
                body: "Poprawnie zalogowano się",
                cb: () => {
                  router.reload("/");
                  setAlertData({});
                },
              });
            })
            .catch((err, a, b, c) => {
              setAlertData({
                variant: "danger",
                title: "bwwrrrr",
                body: "Nie udało się zalogować",
                cb: () => {
                  setAlertData({});
                },
              });
            });
        }}
        initialValues={{
          email: "",
          password: "",
          csrfToken: csrfToken,
        }}
      >
        {({
          errors,
          values,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
          validateField,
          setFieldValue,
        }) => (
          //
          <Form onSubmit={handleSubmit} action="/api/auth/callback/credentials">
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                isInvalid={!!errors.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Haslo</Form.Label>
              <Form.Control
                type="password"
                id="password"
                isInvalid={!!errors.password}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="pt-2">
              <Button variant="primary" type="submit">
                Zaloguj się
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <PopAlert data={alertData} />
    </>
  );
}
