import SweetAlert from "react-bootstrap-sweetalert";
export default function PopAlert({ data }) {
  if (Object.keys(data).length > 0) {
    function CustomBody() {
      if (typeof data.body === "object") {
        if (data.error) {
          if (data.body[data.error]) {
            return data.body[data.error];
          } else {
            return data.body.default + " [" + data.error + "]";
          }
        } else {
        }
      } else {
        return data.body;
      }
    }
    return (
      <span className="position-absolute">
        <SweetAlert type={data.variant} title={data.title} onConfirm={data.cb}>
          <CustomBody />
        </SweetAlert>
      </span>
    );
  } else {
    return <></>;
  }
}
