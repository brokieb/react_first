import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import axiosInstance from "../../../../../../app/lib/axiosInstance";
import dayjs from "dayjs";
export default function NewCredentialsForm(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(true);
  const [product, setProducts] = useState({ data: [] });
  const [prodId, setProdId] = useState("");
  const [usersMaxLen, setUsersMaxLen] = useState("");

  function genCredentialsHandler() {
    const PRE_MAIL = "brokieb";
    const MAIL_DOMAIN = "gmail.com";
    const LEN_LOGIN_NUMS = 4;
    const LEN_PW = 6;
    const NUMBERS = "0123456789";
    const NUM_LEN = NUMBERS.length;
    let nums = "";
    for (let i = 0; i < LEN_LOGIN_NUMS; i++) {
      nums += NUMBERS.charAt(Math.floor(Math.random() * NUM_LEN));
    }
    const CHARACTERS =
      "ABCDEFGHKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    const CHA_LEN = CHARACTERS.length;
    let pw = "";
    for (let i = 0; i < LEN_PW; i++) {
      pw += CHARACTERS.charAt(Math.floor(Math.random() * CHA_LEN));
    }
    setLogin(PRE_MAIL + "+" + nums + "@" + MAIL_DOMAIN);
    setPassword(pw);
  }

  async function getProductDetailsHandler(id) {
    const data = await axiosInstance.get("/api/prods/getProducts", {
      params: {
        _id: id,
      },
    });
    const thisSetting = data.data.settings;
    setUsersMaxLen(thisSetting.usersPerAccount);
  }

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

  async function ProductsSelect() {
    const data = await axiosInstance.get("/api/prods/getProducts", {
      params: {
        _id: null,
      },
    });
    setProducts(data);
  }
  useEffect(() => {
    ProductsSelect();
  }, []);
  return (
    <Formik
      validationSchema={schema}
      enableReinitialize
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={(data) => {
        axiosInstance
          .post("/api/creds/postNewCredentials", {
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              email: data.login,
              password: data.password,
              expiredIn: data.expiredIn,
              comment: data.comment,
              usersMaxLen: data.usersMaxLen,
              active: data.active,
              productId: data.productId,
            },
          })
          .then((res) => {
            if (res.status == "200") {
            } else {
            }
          });
      }}
      initialValues={{
        login: login,
        password: password,
        usersMaxLen: usersMaxLen,
        active: true,
        expiredIn: dayjs().format("YYYY-MM-DD"),
        comment: "",
        productId: prodId,
      }}
    >
      {({ errors, values, handleChange, handleBlur, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="pt-0">
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="login">
                login
              </Form.Label>
              <Form.Control
                value={login}
                onChange={(e) => {
                  handleChange;
                  setLogin(e.target.value);
                }}
                type="text"
                name="login"
                id="login"
                isInvalid={!!errors.login}
              />
              <Form.Control.Feedback type="invalid">
                {errors.login}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="password">
                Hasło
              </Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => {
                  handleChange;
                  setPassword(e.target.value);
                }}
                type="text"
                name="password"
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="expiredIn">
                Aktywne do
              </Form.Label>
              <Form.Control
                value={values.expiredIn}
                onChange={handleChange}
                type="date"
                name="expiredIn"
                id="expiredIn"
                isInvalid={!!errors.expiredIn}
              />
              <Form.Control.Feedback type="invalid">
                {errors.expiredIn}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="productId">
                Produkt
              </Form.Label>
              <Form.Select
                name="productId"
                id="productId"
                isInvalid={!!errors.productId}
                onChange={(e) => {
                  setProdId(e.target.value);
                  getProductDetailsHandler(e.target.value);
                }}
                onBlur={handleBlur}
                value={values.productId}
              >
                {product.data.map((data, i) => (
                  <option key={i} value={data._id}>
                    {data.title}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.productId}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="login">
                Max użytkowników
              </Form.Label>
              <Form.Control
                value={values.usersMaxLen}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                id="usersMaxLen"
                name="usersMaxLen"
                isInvalid={!!errors.usersMaxLen}
              />
              <Form.Control.Feedback type="invalid">
                {errors.usersMaxLen}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Check
                defaultChecked={active}
                className="mt-2 mb-0"
                size="lg"
                id="active"
                type="switch"
                label="Konto aktywne"
                name="active"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">
                {errors.active}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="comment">
                Komentarz
              </Form.Label>
              <Form.Control
                as="textarea"
                name="comment"
                rows="5"
                value={values.comment}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.comment}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.comment}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <div>
              <Button variant="primary" onClick={genCredentialsHandler}>
                Generuj dane
              </Button>
            </div>
            <div>
              <Button variant="secondary" onClick={props.handleClose}>
                Zamknij
              </Button>
              <Button type="submit" variant="success">
                Zapisz
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
}
