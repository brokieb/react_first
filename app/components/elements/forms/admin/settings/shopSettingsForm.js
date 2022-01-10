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

export default function ShopSettingsForm({ settings }) {
  const [alertData, setAlertData] = useState({});
  const { credentialsData, setCredentialsData } = useContext(
    CredentialsDataContext
  );
  const schema = yup
    .object()
    .shape({
      allegroAPI: yup.string().required("To pole jest obowiązkowe"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  let initValues = {};
  for (const setting in settings) {
    initValues = { ...initValues, [setting]: settings[setting].value };
  }

  return (
    <Formik
      validationSchema={schema}
      enableReinitialize
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={(values) => {
        axiosInstance
          .put("/api/settings/putEditSettings", values)
          .then((ans) => {
            setAlertData({
              variant: "success",
              title: "Sukces",
              body: "Poprawnie zaktualizowano ustawienia",
              cb: () => {
                setAlertData({});
              },
            });
          })
          .catch((err) => {
            setAlertData({
              variant: "danger",
              title: "Błąd",
              body: "Nie udało się zaktualizować ustawień",
              cb: () => {
                setAlertData({});
              },
            });
          });
      }}
      initialValues={initValues}
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
          {Object.keys(settings).map((setting, index) => {
            return (
              <Form.Group className="mt-2" controlId={setting} key={index}>
                <Form.Label className="m-0">
                  {settings[setting].title}
                </Form.Label>
                <Form.Control
                  value={values[setting]}
                  type="text"
                  name={setting}
                  isInvalid={!!errors[setting]}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors[setting]}
                </Form.Control.Feedback>
              </Form.Group>
            );
          })}
          <Button variant="success" type="submit">
            Aktualizuj
          </Button>
          <PopAlert data={alertData} />
        </Form>
      )}
    </Formik>
  );
}
