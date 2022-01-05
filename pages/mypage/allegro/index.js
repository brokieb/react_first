import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import axiosInstance, { allegroAxiosAuth } from "app/lib/axiosInstance";
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

  console.log("!!!!!!!!!!!!");
  useEffect(() => {
    const getData = props.query;
    console.log("@@@@@@@@");
    if (getData.code) {
      console.log(getData, "##########");
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

export async function getServerSideProps(context) {
  return {
    props: {
      query: context.query,
      envs: {
        allegro_id: process.env.ALLEGRO_ID,
        allegro_secret: process.env.ALLEGRO_SECRET,
        address: process.env.ADDRESS,
      },
    },
  };
}