import { useEffect } from "react";
import ProductDetails from "/app/components/elementsGroups/store/productDetails";
import axiosInstance from "/app/lib/axiosInstance";
Home.title = "S";
export default function Home(props) {
  useEffect(() => {
    props.setTitle("Produkt " + props.product.title);
  }, [props]);
  return <ProductDetails product={props.product}></ProductDetails>;
}

export async function getServerSideProps(context) {
  const productId = context.params.productId;

  const data = await axiosInstance.get("api/prods/getProducts", {
    params: {
      _id: productId,
    },
  });

  return {
    props: {
      product: data.data,
    },
  };
}
