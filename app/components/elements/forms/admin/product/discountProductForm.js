import { useRef, useState, useContext } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { Formik } from "formik";
import axiosInstance from "../../../../../../app/lib/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import PopAlert from "../../../../../../app/components/modules/popAlert";
import { CredentialsDataContext } from "../../../../../../app/components/elements/tables/credentials/credentialsTableContent";

export default function DiscountProductForm({ productData }) {
  const [alertData, setAlertData] = useState({});
  const { credentialsData, setCredentialsData } = useContext(
    CredentialsDataContext
  );
  const schema = yup
    .object()
    .shape({
      discountValue: yup.number().required("To pole jest obowiązkowe"),
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
        axiosInstance
          .put("/api/prods/putSetProductDiscount", {
            params: {
              id: productData._id,
              discountValue: values.discountValue,
              discountUntil: dayjs(values.discountUntil)
                .add(24, "hour")
                .add(59, "minute")
                .add(59, "second"),
            },
          })
          .then((ans) => {
            if (values.discountValue > 0) {
              setAlertData({
                variant: "success",
                title: "Sukces",
                body: "Poprawnie ustawiono zniżkę",
                cb: () => {
                  setAlertData({});
                },
              });
            } else {
              setAlertData({
                variant: "success",
                title: "Sukces",
                body: "Poprawnie usunięto zniżkę",
                cb: () => {
                  setAlertData({});
                },
              });
            }
            setCredentialsData((item) => {
              return item.map((item, index) => {
                if (item._id == productData._id) {
                  prod.discount = {
                    discountValue: values.discountValue,
                    discountUntil: values.discountUntil,
                  };
                }
                return item;
              });
            });
          })
          .catch((err) => {
            setAlertData({
              variant: "danger",
              title: "Błąd",
              body: "Nie udało się ustawić zniżki",
              cb: () => {
                setAlertData({});
              },
            });
          });
      }}
      initialValues={{
        discountValue: productData.discount.discountValue
          ? productData.discount.discountValue
          : 0,
        discountUntil: productData.discount.discountUntil
          ? dayjs(productData.discount.discountUntil).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
      }}
    >
      {({
        errors,
        values,
        touched,
        handleChange,
        handleSubmit,
        submitForm,
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit} id="editProductForm">
          <Form.Group className="mt-2">
            <Form.Label className="mt-2 mb-0" htmlFor="discountValue">
              Zniżka (kwota)
            </Form.Label>
            <Form.Control
              value={values.discountValue}
              type="decimal"
              name="discountValue"
              id="discountValue"
              isInvalid={!!errors.discountValue}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.discountValue}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-2" controlId="discountUntil">
            <Form.Label className="m-0">Do kiedy</Form.Label>
            <Form.Control
              value={values.discountUntil}
              type="date"
              name="discountUntil"
              isInvalid={!!errors.discountUntil}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.discountUntil}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Wprowadzona data, będzie ostatnim dniem obowiązywania promocji
            </Form.Text>
          </Form.Group>
          <div>
            {dayjs(productData.discount.discountUntil) > dayjs() ? (
              <small className="text-success">Zniżka aktywna</small>
            ) : values.discountValue > 0 ? (
              <small className="text-success">
                Produkt po zniżce będzie kosztować{" "}
                {productData.price / (values.discountValue / 100 + 1)}
              </small>
            ) : (
              <small>Zniżka nie jest zastosowana</small>
            )}
            {}
          </div>
          <div className="mt-2">
            {dayjs(productData.discount.discountUntil) > dayjs() ? (
              <Button
                variant="danger"
                type="button"
                onClick={() => {
                  setFieldValue("discountValue", 0);
                  submitForm();
                }}
              >
                Wyłącz zniżkę
              </Button>
            ) : (
              <Button variant="success" type="submit">
                Ustaw
              </Button>
            )}
          </div>
          <PopAlert data={alertData} />
        </Form>
      )}
    </Formik>
  );
}
