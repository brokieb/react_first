import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "app/components/layout/loading";
import ProductsList from "app/components/elementsGroups/store/productsList";
import axiosInstance from "app/lib/axiosInstance";
export default function Home(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    props.setTitle("Strona główna");
    axiosInstance.get("/api/prods/getProducts").then((products) => {
      setProducts(products.data);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <title>DISA </title>
      strona główna
      <h1>TEST a2 2 22</h1>
      <p>asdaasda</p>
      <p>asdaasda</p>
      <p>asdaasda</p>
      <p
        onClick={() => {
          axiosInstance
            .get("/api/dis")
            .then((item) => {})
            .catch((err) => {});
        }}
      >
        AAAAAAAAAAAAAAAAA
      </p>
      {loading ? <Loading /> : <ProductsList products={products} />}
    </div>
  );
}
