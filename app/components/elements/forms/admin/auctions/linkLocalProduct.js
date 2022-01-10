import axiosInstance from "../../../../../../app/lib/axiosInstance";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import Loading from "../../../../../../app/components/layout/loading";
export default function LinkLocalProduct({ auctionId, setLocalDetails }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const products = await axiosInstance.get("/api/admin/getProducts");
    setProducts(
      products.data
        .filter((item) => {
          return item.auctionId == null && true;
        })
        .map((item) => {
          return {
            title: item.title + " | " + item.SKU + " | " + item.price,
            value: item._id,
          };
        })
    );
    setLoading(false);
  }, []);
  return (
    <Formik
      onSubmit={async (data) => {
        try {
          const updatedProduct = await axiosInstance.put(
            "/api/prods/putEditProduct",
            {
              params: {
                id: data.productId,
                auctionId: auctionId,
              },
            }
          );
          const updatedAuction = await axiosInstance.patch(
            "/api/allegro/patchLocalOffer",
            {
              productId: data.productId,
              auctionId: auctionId,
            }
          );
          setLocalDetails((oldState) => {
            return {
              productId: updatedProduct.data.data,
              ...oldState,
            };
          });
        } catch (err) {}
      }}
      initialValues={{
        productId: "",
      }}
      initialValues={{
        productId: "",
      }}
    >
      {({ errors, values, handleChange, handleBlur, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          {loading ? (
            <Loading />
          ) : (
            <Form.Group>
              <Form.Label className="mt-2 mb-0" htmlFor="productId">
                Produkt
              </Form.Label>
              <div className="d-flex flex-row gap-3">
                <div>
                  <Form.Select
                    name="productId"
                    id="productId"
                    isInvalid={!!errors.productId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.productId}
                  >
                    {products.map((data, i) => (
                      <option key={i} value={data.value}>
                        {data.title}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.productId}
                  </Form.Control.Feedback>
                </div>
                <Button type="submit" variant="success">
                  USTAW
                </Button>
              </div>
            </Form.Group>
          )}
        </Form>
      )}
    </Formik>
  );
}
