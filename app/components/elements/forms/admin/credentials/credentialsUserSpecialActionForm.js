import { useEffect, useState, useContext } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import dayjs from "dayjs";
import axiosInstance from "../../../../../../app/lib/axiosInstance";
import { MoveUsersContext } from "../../../modals/admin/credentials/credentialsDetailsModal";

export default function CredentialsUserSpecialActionForm({
  sendEmail,
  moveUsers,
  id,
  cb,
}) {
  const [siblingsAccounts, setSiblingsAccounts] = useState([]);
  const { movedUsers, setMovedUsers } = useContext(MoveUsersContext);
  async function getData() {
    axiosInstance
      .get("/api/creds/getCredentials", {
        params: {
          mode: "SIBLINGS",
          _id: id,
          users: movedUsers.length,
        },
      })
      .then((creds) => {
        creds.data.map((el) => {
          const days = dayjs(el.expiredIn);
          const diff = dayjs(days).diff(dayjs(), "day");
          setSiblingsAccounts((oldArray) => [
            ...oldArray,
            {
              _id: el._id,
              title: `[${el.usersLen}+${movedUsers.length}/${el.usersMaxLen}] ${
                el.email
              }, ${diff == 1 ? `${diff} dzień` : `${diff} dni`}`,
            },
          ]);
        });
      });
  }

  useEffect(() => {
    getData();
  }, [movedUsers]);

  const schema = yup
    .object()
    .shape({
      newCredId: yup.string().required("To pole jest obowiązkowe"),
    })
    .required();

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        cb(values);
      }}
      onValidate={() => {}}
      initialValues={{
        sendEmail: true,
        newCredId: moveUsers ? "" : "0",
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
        <Form
          id="credentialsChangePasswordForm"
          onSubmit={handleSubmit}
          className="my-2 gap-2 d-inline-flex flex-column"
        >
          {moveUsers ? (
            <Form.Group>
              <Form.Label>Wybierz gdzie przenieść</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="newCredId"
                id="newCredId"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.newCredId}
              >
                <option value="">Wybierz...</option>
                {siblingsAccounts ? (
                  siblingsAccounts.map((data, i) => (
                    <option key={i} value={data._id}>
                      {data.title}
                    </option>
                  ))
                ) : (
                  <option disabled="disabled">Brak pasujących kont</option>
                )}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.newCredId}
              </Form.Control.Feedback>
            </Form.Group>
          ) : (
            <></>
          )}
          {sendEmail ? (
            <Form.Group>
              <Form.Check
                defaultChecked={true}
                className="mt-2 mb-0"
                size="lg"
                type="checkbox"
                label="Wyślij nowe hasło do wszystkich użytkowników"
                name="sendEmail"
                id="sendEmail"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sendEmail}
              </Form.Control.Feedback>
            </Form.Group>
          ) : (
            <></>
          )}
          <Button variant="success" size="sm" className="mt-2" type="submit">
            Wyślij
          </Button>
        </Form>
      )}
    </Formik>
  );
}
