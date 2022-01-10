import { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import SingleImageAuctionCard from "../../../../../../app/components/elements/cards/admin/auctions/singleImageAuctionCard";
import AuctionDescriptionCardButtons from "../../../../../../app/components/elementsGroups/auction/auctionDescriptionCardButtons";
export default function AuctionEditorForm({ auctionDetails }) {
  const [descriptionSection, setDescriptionSection] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    setDescriptionSection(auctionDetails.description.sections);
    setImages(auctionDetails.images);
  }, []);
  useEffect(() => {}, [descriptionSection]);
  const schema = yup
    .object()
    .shape({
      login: yup.string().required("To pole jest obowiązkowe"),
      password: yup.string().required("To pole jest obowiązkowe"),
      usersMaxLen: yup
        .number("To nie jest poprawna liczba")
        .required("To pole jest obowiązkowe"),
    })
    .required();

  return (
    <>
      <Formik
        // validationSchema={schema}
        onSubmit={(data) => {}}
        initialValues={{
          category: auctionDetails.category.id,
          images: auctionDetails.images,
          name: auctionDetails.name,
          sellingFormat: auctionDetails.sellingMode.format,
          sellingPrice: auctionDetails.sellingMode.price.amount,
        }}
      >
        {({ errors, values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="category">
                Kategoria
              </Form.Label>
              <Form.Control
                value={values.category}
                onChange={handleChange}
                type="text"
                name="category"
                id="category"
                isInvalid={!!errors.category}
              />
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="name">
                Tytuł
              </Form.Label>
              <Form.Control
                value={values.name}
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="sellingFormat">
                Typ sprzedaży
              </Form.Label>
              <Form.Control
                value={values.sellingFormat}
                onChange={handleChange}
                type="text"
                name="sellingFormat"
                id="sellingFormat"
                isInvalid={!!errors.sellingFormat}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sellingFormat}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="sellingPrice">
                Cena
              </Form.Label>
              <Form.Control
                value={values.sellingPrice}
                onChange={handleChange}
                type="text"
                name="sellingPrice"
                id="sellingPrice"
                isInvalid={!!errors.sellingPrice}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sellingPrice}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">akceptire</Button>
          </Form>
        )}
      </Formik>
      <div className="d-flex flex-row gap-2 pt-2 flex-wrap justify-content-around">
        {images.map((item, index) => {
          return (
            <span key={index}>
              <SingleImageAuctionCard
                url={item.url}
                allImages={images}
                setImages={setImages}
                key={index}
              />
            </span>
          );
        })}
        <SingleImageAuctionCard
          url={null}
          upload={true}
          allImages={images}
          setImages={setImages}
        />
      </div>

      <hr />
      <div>
        {descriptionSection.map((singleSection, sectionKey) => {
          return (
            <Row
              className="border border-2 mx-1 my-3 position-relative "
              style={{ minHeight: "100px" }}
              key={sectionKey}
            >
              <div className="position-absolute top-0 end-0 w-auto gap-2 d-flex p-2">
                <AuctionDescriptionCardButtons
                  sectionState={setDescriptionSection}
                  sectionKey={sectionKey}
                />
              </div>
              {singleSection.items.length > 0 ? (
                singleSection.items.map((items, key) => {
                  return (
                    <Col
                      className="d-flex m-5 justify-content-center align-items-center"
                      key={key}
                    >
                      {items.type == "TEXT" ? (
                        <>
                          <textarea defaultValue={items.content} />
                        </>
                      ) : (
                        (items.type = "IMAGE" && (
                          <SingleImageAuctionCard
                            url={items.url}
                            allImages={images}
                            setImages={setImages}
                          />
                        ))
                      )}
                    </Col>
                  );
                })
              ) : (
                <Col className="d-flex m-5 justify-content-center align-items-center">
                  Wybierz element z prawego menu
                </Col>
              )}
            </Row>
          );
        })}
      </div>
    </>
  );
}
