import { useEffect } from "react";
export default function Home(props) {
  useEffect(() => {
    props.setTitle("Profil");
  }, [props]);

  return (
    <div className="w-100 d-flex gap-5 flex-column">
      <h1 className="text-center">Witaj</h1>
    </div>
  );
}
