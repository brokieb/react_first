import ProductsList from "app/components/elementsGroups/store/productsList";
import axiosInstance from "app/lib/axiosInstance";
import Loading from "app/components/layout/loading";
import { useState, useEffect } from "react";
export default function Home(props) {
  useEffect(() => {
    props.setTitle("Wszystkie produkty");
  }, [props]);
  return (
    <div>
      <ProductsList products={props.products}></ProductsList>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await axiosInstance.get("/api/prods/getProducts", {
    params: {
      _id: null,
    },
  });
  return {
    props: {
      products: data.data,
    },
  };
}
