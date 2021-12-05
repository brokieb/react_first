import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "app/components/layout/loading";
import ProductsList from "app/components/elementsGroups/store/productsList";
import axiosInstance from "app/lib/axiosInstance";
export default function Home(props) {
  useEffect(() => {
    props.setTitle("Strona główna");
  }, [props]);
  return (
    <div>
      <title>DISA </title>
      strona główna
      <h1>TEST a2 2 22</h1>
      <p>asdaasda</p>
      <p>asdaasda</p>
      <p>asdaasda</p>
      <Link href="/auth/login">TEST A</Link>
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
