import { useEffect } from "react";
export default function Statute(props) {
  useEffect(() => {
    props.setTitle("Regulamin");
  }, [props]);

  return (
    <div className="w-100 d-flex gap-5 flex-column">
      <h1 className="text-center">Regulamin storny</h1>
    </div>
  );
}
