import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../app/components/layout/loading";
import ProductsList from "../app/components/elementsGroups/store/productsList";
import axiosInstance from "../app/lib/axiosInstance";
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
      <h1>Witaj w moim sklepie!</h1>
      <p>Wszystkie konta które można tutaj kupić są w 100% moją własnością.</p>
      <p>
        Czas realizacji zamówień to zwykle do 5 minut, jeżeli masz jakiekolwiek
        pytania zapraszam do chatu który jest dostępny na dole strony
      </p>

      {loading ? <Loading /> : <ProductsList products={products} />}
    </div>
  );
}
