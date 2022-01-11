import { useEffect, useState, useContext } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import axiosInstance from "../../../../../../app/lib/axiosInstance";
import GetData from "../../../../../../app/components/modules/getData";
import PopAlert from "../../../../../../app/components/modules/popAlert";
import Link from "next/link";
import { CartDataContext } from "../../../../../../pages/store/cart/index";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { set } from "../../../../../../app/features/counter/counterSlice";
export default function CreateOrderForm({ credId }) {
  const { cartData, setCartData } = useContext(CartDataContext);
  const [alertData, setAlertData] = useState({});
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  const schema = yup
    .object()
    .shape({
      acceptTerms: yup.boolean().oneOf([true], "Message"),
    })
    .required();

  return (
    <Formik
      validationSchema={schema}
      enableReinitialize
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={() => {
        axiosInstance
          .post("/api/order/postNewOrder", {
            params: {
              cartId: cartData._id,
            },
          })
          .then((res) => {
            dispatch(set(0));
            router.push("/user/orders?" + res.data.id);
          })
          .catch((err) => {});
      }}
      initialValues={{
        acceptTerms: false,
      }}
    >
      {({ errors, values, handleChange, handleSubmit }) => (
        <Form id="createOrderForm" onSubmit={handleSubmit}>
          {session ? (
            <>
              <Form.Group>
                <Form.Check
                  value={values.acceptTerms}
                  onChange={handleChange}
                  isInvalid={!!errors.acceptTerms}
                  type="checkbox"
                  name="acceptTerms"
                  id="acceptTerms"
                  label={
                    values.acceptTerms
                      ? "Regulamin strony został zaakceptowany :)"
                      : "Akceptuję regulamin strony oraz chcę realizować zamówienie"
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.acceptTerms}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="success" type="submit">
                Finalizuj zamówienie
              </Button>
            </>
          ) : (
            <Link href="/auth/login">
              <Button variant="primary">Zaloguj się żeby kontynuować</Button>
            </Link>
          )}
          <Modal.Body className="pt-0"></Modal.Body>
          <PopAlert data={alertData} />
        </Form>
      )}
    </Formik>
  );
}
