import { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { faLock, faUnlock, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "../../../../../../app/lib/axiosInstance";
import { ProductsDataContext } from "../../../../../../pages/admin/products-list/index";
import GetData from "../../../../../../app/components/modules/getData";
import PopAlert from "../../../../../../app/components/modules/popAlert";
export default function ToggleActiveProduct({ prodId }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState({});
  const { ProductsData, setProductsData } = useContext(ProductsDataContext);

  useEffect(() => {
    const ans = GetData(
      ProductsData,
      prodId,
      axiosInstance.get("/api/prods/getProducts", {
        params: {
          _id: prodId,
        },
      })
    ).then((items) => {
      setData(items);
      setLoading(false);
    });
  }, [prodId, ProductsData]);

  async function lockerHandler(status, state) {
    axiosInstance
      .put("/api/prods/putEditProduct", {
        params: {
          id: prodId,
          newStatus: status,
        },
      })
      .then((res) => {
        if (res.status == "200") {
          setProductsData((item) => {
            return item.map((item, index) => {
              if (item._id == prodId) {
                item.settings.active = status;
              }
              return item;
            });
          });
          setLoading(false);
        } else {
          return false;
        }
      });
  }

  function ButtonState() {
    switch (data.settings.active.toString()) {
      case "false":
        return (
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setLoading(true);
              lockerHandler("true", "unlocked");
            }}
          >
            <FontAwesomeIcon icon={faLock} />
          </Button>
        );
      case "true":
        return (
          <Button
            variant="success"
            size="sm"
            onClick={() => {
              setLoading(true);
              lockerHandler("false", "locked");
            }}
          >
            <FontAwesomeIcon icon={faUnlock} />
          </Button>
        );
      default:
        return <>?-{data.active}-3</>;
    }
  }

  return (
    <>
      {loading ? (
        <Button variant="warning" size="sm" disabled>
          <FontAwesomeIcon icon={faSpinner} spin />
        </Button>
      ) : (
        <ButtonState />
      )}
      <PopAlert data={alertData} />
    </>
  );
}
