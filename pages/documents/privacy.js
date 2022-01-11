import { useEffect } from "react";
export default function Privacy(props) {
  useEffect(() => {
    props.setTitle("Polityka prywatności");
  }, [props]);

  return (
    <div className="w-100 d-flex gap-5 flex-column">
      <h1 className="text-center">Polityka prywatności</h1>
    </div>
  );
}
