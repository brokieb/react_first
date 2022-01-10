import React, { createContext, useState, useMemo, useEffect } from "react";
import AddCredentialsForm from "../../../app/components/elements/forms/admin/credentials/addCredentialsForm";
import CredentialsTable from "../../../app/components/elements/tables/credentials/credentialsTableContent";
import axiosInstance from "../../../app/lib/axiosInstance";
import Loading from "../../../app/components/layout/loading";

export default function Home(props) {
  const [credentialsData, setCredentialsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.setTitle("[A] - Dane logowania");
  }, [props]);

  useEffect(() => {
    axiosInstance.get("/api/creds/getCredentials").then((ans) => {
      setCredentialsData(ans.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="d-flex justify-content-between w-100 flex-column">
      <div>
        <AddCredentialsForm />
      </div>

      {loading ? <Loading /> : <CredentialsTable items={credentialsData} />}
    </div>
  );
}
