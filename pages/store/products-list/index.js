import ProductsList from "../../../app/components/elementsGroups/store/productsList";
import axiosInstance from "../../../app/lib/axiosInstance";
import Loading from "../../../app/components/layout/loading";
import { useState, useEffect } from "react";
export default function Home(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    props.setTitle("Wszystkie produkty");
    axiosInstance.get("/api/prods/getProducts").then((products) => {
      setProducts(products.data);
      setLoading(false);
    });
  }, []);
  return loading ? <Loading /> : <ProductsList products={products} />;
}
