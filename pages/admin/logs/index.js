import { useEffect } from "react";
import axiosInstance from "../../../app/lib/axiosInstance";
export default function Home(props) {
  useEffect(() => {
    props.setTitle("[A] - Logi systemowe");
  }, [props]);
  return (
    <h2>
      LOGI
      <button
        onClick={() => {
          axiosInstance
            .get("/api/dis")
            .then((item) => {})
            .catch((err) => {});
        }}
      >
        KLL
      </button>
    </h2>
  );
}
