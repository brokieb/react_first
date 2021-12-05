import { useEffect } from "react";
export default function Home(props) {
  useEffect(() => {
    props.setTitle("[A] - Logi systemowe");
  }, [props]);
  return <h2>LOGI</h2>;
}
