import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductDetails from "../../../../app/components/elementsGroups/store/productDetails";
import axiosInstance from "../../../../app/lib/axiosInstance";
import Loading from "../../../../app/components/layout/loading";

export default function Home({ setTitle }) {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get("/api/prods/getProducts", {
        params: {
          _id: router.query.productId,
        },
      })
      .then((product) => {
        setTitle("Produkt " + product.data.title);
        setProduct(product.data);
        setLoading(false);
      });
  }, []);
  return loading ? <Loading /> : <ProductDetails product={product} />;
}
