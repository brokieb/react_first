import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { signIn, useSession } from "next-auth/react";
import { Formik } from "formik";
import PopAlert from "../../../modules/popAlert";
import axiosInstance from "../../../../../app/lib/axiosInstance";

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
                  // router.push("/");
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
        {({ errors, handleChange, handleSubmit }) => (
          //
          <Form onSubmit={handleSubmit} action="/api/auth/callback/credentials">
            <Form.Group>
              <Form.Label htmlFor="email" className="mt-2 mb-0">
                Email
              </Form.Label>
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
              <Form.Label htmlFor="password" className="mt-2 mb-0">
                Haslo
              </Form.Label>
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
            <Button
              type="submit"
              className="d-flex align-items-center px-0 py-2 w-100 my-2"
            >
              <FontAwesomeIcon icon={faLock} className="mx-2 fs-4" />
              Zaloguj się
            </Button>
          </Form>
        )}
      </Formik>
      <PopAlert data={alertData} />
    </>
  );
}
