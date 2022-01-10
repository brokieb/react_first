import { Button, Modal, Form, Alert, Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../../app/lib/axiosInstance";
import { useForm } from "react-hook-form";
import { useSession, signOut } from "next-auth/react";

import Loading from "../../../../../app/components/layout/loading";
import * as yup from "yup";
import { Formik } from "formik";
import { createHash } from "crypto";
import queryString from "query-string";
import PopAlert from "../../../../../app/components/modules/popAlert";

export default function RemoveUserForm(props) {
  const [loadingData, setLoadingData] = useState(true);
  const [alertData, setAlertData] = useState({});

  return (
    <Formik
      onSubmit={(values, action) => {
        axiosInstance.delete("/api/user/deleteAccount").then(() => {
          setAlertData({
            variant: "success",
            title: "Sukces",
            body: "Poprawnie usunięto użytkownika z bazy",
            cb: () => {
              signOut({
                callbackUrl: `/`,
              });
              setAlertData({});
            },
          });
        });
      }}
      initialValues={{
        init: true,
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          {props.children}
          <PopAlert data={alertData} />
        </Form>
      )}
    </Formik>
  );
}
