import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "app/lib/axiosInstance";
import Loading from "app/components/layout/loading";
import PopAlert from "app/components/modules/popAlert";
export default function Home(props) {
  const [ready, setReady] = useState(false);
  const [alertData, setAlertData] = useState({});
  const router = useRouter();

  useEffect(() => {
    props.setTitle("Autoryzacja...");
  }, [props]);

  useEffect(() => {
    if (ready) {
      router.push("/admin/settings");
    }
  }, [ready]);

  useEffect(() => {
    const getData = router.query;

    if (getData.code) {
      axiosInstance
        .put("/api/allegro/putAuthToken", {
          accessCode: getData.code,
        })
        .finally((ans) => {
          setAlertData({
            variant: "success",
            title: "Ok!",
            body: "Poprawnie połączono się z kontem allegro!",
            cb: () => {
              setReady(true);
              setAlertData({});
            },
          });
        })
        .catch((err) => {
          setAlertData({
            variant: "danger",
            title: "Błąd!",
            body: "Nie udało się połączyć",
            cb: () => {
              setReady(true);
              setAlertData({});
            },
          });
        });
    }
  }, []);

  return (
    <>
      h3h3h3h3h33hh3
      <Loading />
      <PopAlert data={alertData} />
    </>
  );
}
