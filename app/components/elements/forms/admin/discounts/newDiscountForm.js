import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import axiosInstance from "../../../../../../app/lib/axiosInstance";
import dayjs from "dayjs";
import PopAlert from "../../../../../../app/components/modules/popAlert";
export default function NewDiscountForm(props) {
  const [alertData, setAlertData] = useState({});
  const schema = yup
    .object()
    .shape({
      discountCode: yup.string().required("To pole jest obowiązkowe"),
      discountCodeQty: yup.number().required("To pole jest obowiązkowe"),
      discountValue: yup.number().required("To pole jest obowiązkowe"),
      discontType: yup.string().required("To pole jest obowiązkowe"),
      discountLimits: yup.string().required("To pole jest obowiązkowe"),
      expiredIn: yup.date().required("To pole jest obowiązkowe"),
    })
    .required();

  return (
    <>
      <Formik
        validationSchema={schema}
        enableReinitialize
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(data) => {
          axiosInstance
            .post("/api/discount/postNewDiscountCode", {
              params: {
                code: data.discountCode,
                codeQty: data.discountCodeQty,
                expiredIn: data.expiredIn,
                type: data.discountType,
                value: data.discountValue,
                limits: data.discountLimits,
              },
            })
            .then((item) => {
              setAlertData({
                variant: "success",
                title: "Sukces",
                body: "Poprawnie dodano nowy kod zniżkowy",
                cb: () => {
                  setAlertData({});
                  props.hideModal();
                },
              });
            })
            .catch((error) => {
              setAlertData({
                variant: "danger",
                title: "Błąd",
                body: "Nie duało się",
                cb: () => {
                  setAlertData({});
                },
              });
            });
        }}
        initialValues={{
          discountCode: "",
          discountCodeQty: "",
          discontType: "",
          discountValue: "",
          discountLimits: "",
          expiredIn: dayjs().format("YYYY-MM-DDTHH:MM"),
        }}
      >
        {({ errors, values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body className="pt-0">
              <Form.Group>
                <Form.Label className="mt-2 mb-0" htmlFor="discountCode">
                  Kod
                </Form.Label>
                <Form.Control
                  value={values.discountCode}
                  onChange={handleChange}
                  type="text"
                  name="discountCode"
                  id="discountCode"
                  isInvalid={!!errors.discountCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.discountCode}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2 mb-0" htmlFor="discountCodeQty">
                  Ilość kodów
                </Form.Label>
                <Form.Control
                  value={values.discountCodeQty}
                  onChange={handleChange}
                  type="text"
                  name="discountCodeQty"
                  id="discountCodeQty"
                  isInvalid={!!errors.discountCodeQty}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.discountCodeQty}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2 mb-0" htmlFor="discountValue">
                  Wartość kodu
                </Form.Label>
                <Form.Control
                  value={values.discountValue}
                  onChange={handleChange}
                  type="text"
                  name="discountValue"
                  id="discountValue"
                  isInvalid={!!errors.discountValue}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.discountValue}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2 mb-0" htmlFor="expiredIn">
                  Do kiedy obowiązuje
                </Form.Label>
                <Form.Control
                  value={values.expiredIn}
                  onChange={handleChange}
                  type="datetime-local"
                  name="expiredIn"
                  id="expiredIn"
                  isInvalid={!!errors.expiredIn}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.expiredIn}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2 mb-0" htmlFor="discontType">
                  Typ zniżki
                </Form.Label>
                <Form.Select
                  name="discontType"
                  id="discontType"
                  isInvalid={!!errors.discontType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.discontType}
                >
                  {["PERCENT", "AMOUNT"].map((data, i) => (
                    <option key={i} value={data}>
                      {data}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.discontType}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2 mb-0" htmlFor="discountLimits">
                  Ograniczenia
                </Form.Label>
                <Form.Select
                  name="discountLimits"
                  id="discountLimits"
                  isInvalid={!!errors.discountLimits}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.discountLimits}
                >
                  {["ONE_PER_USER", "NONE"].map((data, i) => (
                    <option key={i} value={data}>
                      {data}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.discountLimits}
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
      <PopAlert data={alertData} />
    </>
  );
}
