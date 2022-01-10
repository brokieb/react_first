import { useEffect, useState, useContext } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import dayjs from "dayjs";
import axiosInstance from "../../../../../../app/lib/axiosInstance";
import { CredentialsDataContext } from "../../../../../../app/components/elements/tables/credentials/credentialsTableContent";
import GetData from "../../../../../../app/components/modules/getData";
import PopAlert from "../../../../../../app/components/modules/popAlert";
export default function credentialsChangePasswordForm({ credId }) {
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [alertData, setAlertData] = useState({});

  const [comment, setComment] = useState("");
  const [commentValid, setCommentValid] = useState(false);

  const [expiredIn, setExpiredIn] = useState("");
  const [expiredInValid, setExpiredInValid] = useState(false);

  const [sendMail, setSendMail] = useState(true);
  const [readyData, setReadyData] = useState("");

  const { credentialsData, setCredentialsData } = useContext(
    CredentialsDataContext
  );

  useEffect(() => {
    GetData(
      credentialsData,
      credId,
      axiosInstance.get("/api/creds/getCredentials", {
        params: {
          _id: credId,
        },
      })
    ).then((items) => {
      setReadyData(items);
      setPassword(items.password);
      setComment(items.comment);
      setExpiredIn(dayjs(items.expiredIn).format("YYYY-MM-DD"));
    });
  }, [credId]);

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

    setPasswordValid(true);
    setPassword(pw);
  }
  const schema = yup
    .object()
    .shape({
      password: yup.string().required("To pole jest obowiązkowe"),
    })
    .required();

  return (
    <Formik
      validationSchema={schema}
      enableReinitialize
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={(values) => {
        axiosInstance
          .put("/api/creds/putEditCredentials", {
            params: {
              id: readyData._id,
              password: values.password,
              expiredIn: values.expiredIn,
              comment: values.comment,
            },
          })
          .then((ans) => {
            setAlertData({
              variant: "success",
              title: "Sukces",
              body: "Poprawnie zmieniono dane",
              cb: () => {
                setAlertData({});
              },
            });
            const index = GetIndex(credentialsData, readyData._id);
            setCredentialsData((item) => {
              return item.map((item, index) => {
                if (item._id == readyData._id) {
                  item.password = values.password;
                  item.expiredIn = values.expiredIn;
                  item.comment = values.comment;
                }
                return item;
              });
            });
            setPasswordValid(false);
            setCommentValid(false);
            setExpiredInValid(false);
          })
          .catch((err) => {
            setAlertData({
              variant: "danger",
              title: "Błąd",
              body: "Wystąpił błąd przy edytowaniu danego konta",
              cb: () => {
                setAlertData({});
              },
            });
          });
      }}
      initialValues={{
        password: password,
        sendMail: true,
        comment: comment,
        expiredIn: expiredIn,
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
        <Form id="credentialsChangePasswordForm" onSubmit={handleSubmit}>
          <Modal.Body className="pt-0">
            <Form.Group>
              <InputGroup className="mb-3" htmlFor="password" hasValidation>
                <Form.Control
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFieldValue("password", e.target.value);
                    setPasswordValid(true);
                  }}
                  variant="primary"
                  type="text"
                  name="password"
                  isInvalid={!!errors.password}
                  isValid={passwordValid && !errors.password}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    genCredentialsHandler();
                  }}
                >
                  GENERUJ
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
                <Form.Control.Feedback>DANE ZMIENIONE</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Check
                defaultChecked={sendMail}
                className="mt-2 mb-0"
                size="lg"
                type="checkbox"
                label="Wyślij nowe hasło do wszystkich użytkowników"
                name="sendMail"
                id="custom-switch"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sendMail}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="expiredIn">
                Aktywne do
              </Form.Label>
              <Form.Control
                defaultValue={expiredIn}
                onChange={(e) => {
                  setExpiredInValid(true);
                  setFieldValue("expiredIn", e.target.value);
                }}
                type="date"
                name="expiredIn"
                isInvalid={!!errors.expiredIn}
                isValid={expiredInValid && !errors.expiredIn}
              />
              <Form.Control.Feedback type="invalid">
                {errors.expiredIn}
              </Form.Control.Feedback>
              <Form.Control.Feedback>DANE ZMIENIONE</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="comment">
                Komentarz
              </Form.Label>
              <Form.Control
                defaultValue={comment}
                onChange={(e) => {
                  setCommentValid(true);
                  setFieldValue("comment", e.target.value);
                }}
                as="textarea"
                name="comment"
                rows="5"
                isInvalid={!!errors.comment}
                isValid={commentValid && !errors.comment}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.comment}
              </Form.Control.Feedback>
              <Form.Control.Feedback>DANE ZMIENIONE</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <PopAlert data={alertData} />
        </Form>
      )}
    </Formik>
  );
}
