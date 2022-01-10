import { Button, Modal, Form, Alert, Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../../app/lib/axiosInstance";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import Loading from "../../../../../app/components/layout/loading";
import * as yup from "yup";
import { Formik } from "formik";
import { createHash } from "crypto";
import queryString from "query-string";

export default function FinishOrderModal(props) {
  const [loadingData, setLoadingData] = useState(true);
  const [readyData, setReadyData] = useState("");
  const [email, setEmail] = useState("asd@o2.pl");
  const [secret, setSecret] = useState("aaa");
  const [amount, setAmount] = useState("ss");
  const [serviceName, setServiceName] = useState("sadd");
  const [serviceAddress, setServiceAddress] = useState("asda");
  const [orderId, setOrderId] = useState("sada");
  const [userDetails, setUserDetails] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setEmail(session.user.email);
  }, []);

  async function getData() {
    const user = await axiosInstance.get("/api/user/getUser");
    setUserDetails(user.data);

    const order = await axiosInstance.get("/api/order/getOrders", {
      params: {
        _id: props.orderId,
      },
    });
    const data = order.data[0];

    setServiceAddress("http://localhost");
    setOrderId(data._id);
    setSecret("SEKRET");
    setServiceName("SKLEP");
    setLoadingData(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const schema = yup
    .object()
    .shape({
      EMAIL: yup
        .string()
        .email("To nie jest prawidłowy adres email")
        .required("To pole jest obowiązkowe"),
    })
    .required();
  return (
    <Modal onHide={props.handleClose} show={props.show} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Realizacja zamówienia</Modal.Title>
      </Modal.Header>
      <Formik
        validationSchema={schema}
        onSubmit={(values, action) => {
          const stringToHash =
            "Damian#3" +
            ";" +
            values.KWOTA +
            ";" +
            values.NAZWA_USLUGI +
            ";" +
            values.ADRES_WWW +
            ";" +
            values.ID_ZAMOWIENIA +
            ";" +
            values.SEKRET;
          const hash = createHash("sha256").update(stringToHash).digest("hex");
          values["HASH"] = hash;
          const params = queryString.stringify(values);
          window.open("https://platnosc.hotpay.pl?" + params, "_blank");
        }}
        initialValues={{
          SEKRET:
            "SW9sclhZdFdGTjhoZXFxMWQ4TkdYbjE0VFFNSVVraDVpbm9zcUx3UkQ2cz0,",
          KWOTA: "13.50",
          NAZWA_USLUGI: "BROKIEB.PL SKLEP",
          ADRES_WWW: "https://localhost",
          ID_ZAMOWIENIA: "12312312313",
          EMAIL: "brokieb@gmail.com",
          DANE_OSOBOWE: "damian wozniak",
        }}
      >
        {({ errors, values, handleChange, handleSubmit }) => (
          <Form action="http://onet.pl" method="GET" onSubmit={handleSubmit}>
            <Modal.Body>
              {loadingData ? (
                <Loading />
              ) : userDetails.email ? (
                <>
                  <Alert variant="success">
                    Zamówienie zostanie wysłane na adres: {userDetails.email}
                  </Alert>
                </>
              ) : (
                <>
                  <Alert variant="info">
                    Do twojego konta nie został przypisany adres e-mail.
                    Uzupełnij go żeby kontynuować
                  </Alert>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="EMAIL">Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="EMAIL"
                      value={values.EMAIL}
                      onChange={handleChange}
                      isInvalid={!!errors.EMAIL}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.EMAIL}
                    </Form.Control.Feedback>
                  </Form.Group>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleClose}>
                Zamknij
              </Button>
              {loadingData ? (
                <Button variant="success" type="button" disabled>
                  <Loading variant="tiny" />
                </Button>
              ) : (
                <Button variant="success" type="submit">
                  ZAPŁAĆ ! ! !
                </Button>
              )}
            </Modal.Footer>
          </Form>
        )}
      </Formik>
      <form id="order" action="https://platnosc.hotpay.pl/" method="post">
        <input
          required
          name="SEKRET"
          value="SW9sclhZdFdGTjhoZXFxMWQ4TkdYbjE0VFFNSVVraDVpbm9zcUx3UkQ2cz0,"
          type="hidden"
        />
        <input required name="KWOTA" value="1" type="hidden" />
        <input
          required
          name="NAZWA_USLUGI"
          value="BROKIEB.PL SKLEP"
          type="hidden"
        />
        <input
          required
          name="ADRES_WWW"
          value="http://localhost"
          type="hidden"
        />
        <input required name="ID_ZAMOWIENIA" value="123123123" type="hidden" />
        <input name="EMAIL" value="damis1996@vp.pl" type="hidden" />
        <input name="DANE_OSOBOWE" value="dasdad" type="hidden" />
        <button type="submit">DALEJ</button>
      </form>
    </Modal>
  );
}
