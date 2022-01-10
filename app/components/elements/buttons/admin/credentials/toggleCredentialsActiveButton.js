import { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { faLock, faUnlock, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "../../../../../lib/axiosInstance";
import { CredentialsDataContext } from "../../../tables/credentials/credentialsTableContent";
import GetData from "../../../../modules/getData";
export default function ToggleCredentialsActive({ credId }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const { credentialsData, setCredentialsData } = useContext(
    CredentialsDataContext
  );

  useEffect(() => {
    const ans = GetData(
      credentialsData,
      credId,
      axiosInstance.get("/api/creds/getCredentials", {
        params: {
          _id: credId,
        },
      })
    ).then((items) => {
      setData(items);
      setLoading(false);
    });
  }, [credId, credentialsData]);

  async function lockerHandler(status, state) {
    axiosInstance
      .put("/api/creds/putEditCredentials", {
        params: {
          id: credId,
          newStatus: status,
        },
      })
      .then((res) => {
        if (res.status == "200") {
          setCredentialsData((item) => {
            return item.map((item, index) => {
              if (item._id == credId) {
                item.active = status;
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
    switch (data.active.toString()) {
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
    </>
  );
}
