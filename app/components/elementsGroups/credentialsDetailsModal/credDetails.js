import {
  Button,
  Modal,
  Nav,
  Col,
  Tab,
  Row,
  ListGroup,
  CloseButton,
  Alert,
} from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../../../app/lib/axiosInstance";
import ToggleCredentialsActiveButton from "../../elements/buttons/admin/credentials/toggleCredentialsActiveButton";
import AddMonthHandlerButton from "../../../../app/components/elements/buttons/admin/credentials/credentialsAddMonthButton";
import CopyString from "../../../../app/components/modules/copyString";
import dayjs from "dayjs";
import { CredentialsDataContext } from "../../../../app/components/elements/tables/credentials/credentialsTableContent";
import PopAlert from "../../../../app/components/modules/popAlert";
export default function credDetails({ cred }) {
  const { credentialsData, setCredentialsData } = useContext(
    CredentialsDataContext
  );
  const [alertData, setAlertData] = useState({});
  const product = cred;
  return (
    <>
      {product.users.length != product.usersLen ? (
        <Alert variant="danger">
          Ilość osób na koncie nie zgadza się z zadeklarowaną liczbą, na koncie
          jest: <strong>{product.users.length}</strong>, zadeklarowane:{" "}
          <strong>{product.usersLen}</strong>. W celu naprawienia tego błędu,{" "}
          <a
            href="#"
            onClick={() => {
              axiosInstance
                .put("/api/creds/putFixCredentialsUsersCounter", {
                  params: {
                    id: product._id,
                  },
                })
                .then((ans) => {
                  const readyData = ans.data;
                  setAlertData({
                    variant: "success",
                    title: "Sukces",
                    body: "Konto zostało poprawnie naprawione",
                    cb: () => {
                      setAlertData({});
                    },
                  });
                  setCredentialsData((item) => {
                    return item.map((item, index) => {
                      if (item._id == readyData.data._id) {
                        item.usersLen = readyData.data.usersLen;
                      }
                      return item;
                    });
                  });
                });
            }}
          >
            KLIKNIJ TUTAJ
          </a>
          , wtedy ustawię licznik użytkowników na poprawną liczbę
        </Alert>
      ) : (
        <></>
      )}
      <div className="d-flex justify-content-evenly">
        <ToggleCredentialsActiveButton credId={product._id} />
        <AddMonthHandlerButton credId={product._id} />
      </div>
      <hr className="mx-5" />
      <ul>
        <li>
          email: <strong>{product.email}</strong>
          <CopyString string={product.email} />
        </li>
        <li>
          Hasło: <strong>{product.password}</strong>
          <CopyString string={product.password} />
        </li>
        <li>
          Aktywne do:{" "}
          <strong>{dayjs(product.expiredIn).format("DD/MM/YYYY")}</strong>
        </li>
        <li>
          Ostatnia aktualizacja:{" "}
          <strong>
            {dayjs(product.updatedAt).format("DD/MM/YYYY HH:mm:ss")}
          </strong>
        </li>
        <li>
          użytkownicy:{" "}
          <strong>
            {product.usersLen}/{product.usersMaxLen}
          </strong>
        </li>
      </ul>
      <hr className="mx-5" />
      {product.productId._id && (
        <div className="border d-flex flex-row mx-3 p-2 gap-3">
          <img
            src={product.productId.imageUrl}
            style={{ height: "60px" }}
          ></img>
          <div>
            <strong>{product.productId.title}</strong>
            <small className="ps-2">{product.productId.SKU}</small>
            <p>{product.productId.price} zł</p>
          </div>
        </div>
      )}

      <PopAlert data={alertData} />
    </>
  );
}
