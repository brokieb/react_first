import { useRef, useState, useEffect } from "react";
import axiosInstance from "../../../../../app/lib/axiosInstance";
import Loading from "../../../../../app/components/layout/loading";
import CredentialsTableContent from "../../../../../app/components/elements/tables/credentials/credentialsTableContent";
export default function ConnectedAccountsPane({ product }) {
  const [credsData, setCredsData] = useState([]);
  const [loadingCredsTable, setLoadingCredsTable] = useState(true);
  useEffect(() => {
    axiosInstance
      .get("/api/prods/getCredentials", {
        params: {
          _id: product._id,
        },
      })
      .then((items) => {
        setCredsData(items.data);
        setLoadingCredsTable(false);
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      {loadingCredsTable ? (
        <Loading />
      ) : (
        <CredentialsTableContent items={credsData} />
      )}
    </>
  );
}
