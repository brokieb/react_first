import { useEffect, useState, useContext } from "react";
import { Button, Modal, Form, InputGroup, Alert } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import axiosInstance from "../../../../../../app/lib/axiosInstance";
import PopAlert from "../../../../../../app/components/modules/popAlert";
import { OrdersContext } from "../../../../../../pages/admin/all-orders";
export default function ChangeOrderStatusForm({ order }) {
  const { data: session, status } = useSession();
  const { orders, setOrders } = useContext(OrdersContext);
  const [alertData, setAlertData] = useState({});

  const schema = yup
    .object()
    .shape({
      discountCode: yup.string(),
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
          .patch("/api/admin/patchUpdateOrderStatus", {
            orderStatus: values.orderStatus,
            orderId: values.orderId,
          })
          .then((item) => {
            setAlertData({
              variant: "success",
              title: "Sukces",
              body: "Poprawnie zaktualizowano zamówienie!",
              cb: () => {
                setOrders((item) => {
                  return item.map((item, index) => {
                    if (item._id == values.orderId) {
                      //stare konto
                      item.orderStatus = values.orderStatus;
                    }
                    return item;
                  });
                });
                setAlertData({});
              },
            });
          })
          .catch((err) => {
            setAlertData({
              variant: "danger",
              title: "Błąd",
              body: "NIe udało się zaktualizować zamóienia!",
              cb: () => {
                setAlertData({});
              },
            });
          });
      }}
      initialValues={{
        orderStatus: order.orderStatus,
        orderId: order._id,
      }}
    >
      {({ errors, values, touched, handleChange, handleSubmit }) => (
        <Form id="ChangeOrderStatusForm" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Status zamówienia</Form.Label>
            <Form.Select
              aria-label="Default select example"
              id="orderStatus"
              name="orderStatus"
              onChange={handleChange}
              value={values.orderStatus}
              isInvalid={!!errors.orderStatus}
            >
              <option>Wybierz opcję</option>
              <option value="NEW">NEW</option>
              <option value="NOT-PAID">NOT PAID</option>
              <option value="PAID">PAID</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="FINISHED">FINISHED</option>
            </Form.Select>
          </Form.Group>
          <PopAlert data={alertData} />
        </Form>
      )}
    </Formik>
  );
}
