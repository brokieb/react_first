import NewClientForm from "../../../app/components/elements/forms/auth/newClientForm";
import axiosInstance from "../../../app/lib/axiosInstance";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home(props) {
  useEffect(() => {
    props.setTitle("Tworzenie konta");
  }, [props]);
  const router = useRouter();
  function addClientHandler(data) {
    axiosInstance
      .post("/api/auth/postNewUser", {
        params: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      })
      .then((res) => {
        if (res.status == "201") {
          router.push("/auth/login");
        } else {
        }
      });
  }
  return <NewClientForm onAddClient={addClientHandler}></NewClientForm>;
}
