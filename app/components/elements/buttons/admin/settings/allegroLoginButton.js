import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
const qs = require("qs");
import { Button } from "react-bootstrap";
const fetch = require("node-fetch");
import dayjs from "dayjs";
import axiosInstance, {
  allegroAxiosAuth,
  allegroAxios,
} from "../../../../../../app/lib/axiosInstance";

export default function AllegroLoginButton({ envs }) {
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const [queryString, setQueryString] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const access = axiosInstance
      .get("/api/allegro/getLogin")
      .then((item) => {
        if (item.status == 200) {
          setLogin(true);
          setData(item.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        const params = err.response.data;
        const readyObj = Object.keys(params)
          .map(function (key) {
            return key + "=" + params[key];
          })
          .join("&");

        setLogin(false);
        setQueryString(readyObj);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <>loading</>
  ) : login ? (
    <>
      zalogowane jako {data.login}, {data.email}
    </>
  ) : (
    <Button
      href={
        "https://allegro.pl.allegrosandbox.pl/auth/oauth/authorize?" +
        queryString
      }
    >
      Zaloguj przez allegro
    </Button>
  );
}
