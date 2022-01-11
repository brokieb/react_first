import { useEffect, useState, useContext } from "react";
import { Button, Modal, Form, InputGroup, Alert } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import axiosInstance from "../../../../../../app/lib/axiosInstance";
import { CartDataContext } from "../../../../../../pages/store/cart/index";
import GetData from "../../../../../../app/components/modules/getData";
import PopAlert from "../../../../../../app/components/modules/popAlert";
export default function DiscountCodeForm({ cart }) {
  const { cartData, setCartData } = useContext(CartDataContext);
  const [alertData, setAlertData] = useState({});
  const { data: session, status } = useSession();
  const schema = yup
    .object()
    .shape({
      discountCode: yup.string(),
    })
    .required();

  return cartData.discount ? (
    <Alert variant="info">
      Do zamówienia przypisany jest kod zniżkowy{" "}
      <strong>{cartData.discount.code}</strong>
    </Alert>
  ) : (
    <Formik
      validationSchema={schema}
      enableReinitialize
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={(values) => {
        axiosInstance
          .get("/api/discount/getCheckCodeValidy", {
            params: {
              code: values.discountCode,
              cart: cart._id,
            },
          })
          .then((ans) => {
            if (ans.data.data) {
              const discData = ans.data.data;
              setAlertData({
                variant: "success",
                title: "success",
                body: "Kod istnieje",
                cb: () => {
                  setCartData({
                    ...cartData,
                    discount: {
                      code: discData.code,
                      expiredIn: discData.expiredIn,
                      discountId: discData._id,
                      discountValue: discData.value,
                      discountType: discData.type,
                    },
                  });
                  setAlertData({});
                },
              });
            } else {
              setAlertData({
                variant: "danger",
                title: "success",
                body: "Takiego kodu nie ma",
                cb: () => {
                  setAlertData({});
                },
              });
            }
          })
          .catch((err) => {
            setAlertData({
              variant: "danger",
              title: "success",
              body: "Wystąpił błąd!",
              cb: () => {
                setAlertData({});
              },
            });
          });
      }}
      initialValues={{
        discountCode: "",
      }}
    >
      {({
        errors,
        values,
        touched,
        handleChange,
        handleSubmit,
        validateField,
        setFieldValue,
      }) => (
        <Form id="addDiscountToCart" onSubmit={handleSubmit}>
          <Form.Label>
            Jeżeli taki posiadasz, możesz podać kod zniżkowy poniżej:
          </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Kod zniżkowy"
              name="discountCode"
              value={values.discountCode}
              onChange={handleChange}
              isInvalid={!!errors.discountCode}
            />
            <Button type="submit" variant="outline-success" id="button-addon2">
              Sprawdź...
            </Button>
          </InputGroup>
          <PopAlert data={alertData} />
        </Form>
      )}
    </Formik>
  );
}
