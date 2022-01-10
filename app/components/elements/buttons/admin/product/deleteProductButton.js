import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import axiosInstance from "../../../../../../app/lib/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { ProductsDataContext } from "../../../../../../pages/admin/products-list";
import PopAlert from "../../../../../../app/components/modules/popAlert";
export default function DeleteProductButton({ prodId, onSuccess }) {
  const [alertData, setAlertData] = useState({});
  const { ProductsData, setProductsData } = useContext(ProductsDataContext);
  return (
    <>
      <span>
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            axiosInstance
              .delete("/api/prods/deleteProduct", {
                params: {
                  id: prodId,
                },
              })
              .then((ans) => {
                setAlertData({
                  variant: "success",
                  title: "Sukces",
                  body: "Poprawnie usunięto produkt z bazy",
                  cb: () => {
                    setAlertData({});
                    setProductsData((item) => {
                      return item.filter((item, index) => {
                        return item._id != prodId;
                      });
                    });
                  },
                });
              })
              .catch((err) => {
                setAlertData({
                  variant: "danger",
                  title: "Błąd!",
                  body: "Wystąpił błąd podczas usuwania elementu",
                  cb: () => {
                    setProductsData({});
                  },
                });
              });
          }}
        >
          <FontAwesomeIcon icon={faBan} />
        </Button>
        <PopAlert data={alertData} />
      </span>
    </>
  );
}
