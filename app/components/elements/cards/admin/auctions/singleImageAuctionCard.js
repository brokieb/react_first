import { Button, Image } from "react-bootstrap";
import { useState } from "react";
import { Formik } from "formik";
export default function SingleImageAuctionCard({ url, allImages, upload }) {
  const [editMode, setEditMode] = useState(false);
  const [upImage, setUpImage] = useState("");

  return (
    <Button variant="outline" className="p-0">
      {editMode ? (
        <div className="d-flex justify-content-around border p-2">
          {allImages.map((item, key) => {
            return (
              <div variant="outline" key={key}>
                <Image
                  src={item.url}
                  thumbnail
                  style={{ width: "80px" }}
                  className="m-1"
                />
              </div>
            );
          })}
          <div variant="outline" className="border" style={{ width: "80px" }}>
            ???
          </div>
        </div>
      ) : url ? (
        <Image
          src={url}
          thumbnail
          style={{ height: "150px" }}
          onClick={() => {
            setEditMode(true);
          }}
        />
      ) : (
        <div
          className="border d-flex justify-content-center align-items-center"
          style={{ height: "350px", width: "350px" }}
        >
          <Formik
            initialValues={{ file: null }}
            onSubmit={(values) => {
              let reader = new FileReader();
            }}
          >
            {({ values, handleSubmit, setFieldValue, handleChange }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label for="file">File upload</label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      onChange={(event) => {
                        setFieldValue("file", event.currentTarget.files[0]);
                      }}
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    submit
                  </button>
                  <Image
                    src={values.file}
                    thumbnail
                    style={{ height: "150px" }}
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      )}
    </Button>
  );
}
