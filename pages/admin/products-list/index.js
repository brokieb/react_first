import { useEffect, useState, createContext, useMemo } from "react";
import ProductsList from "../../../app/components/elementsGroups/product/productsList";
import axiosInstance from "../../../app/lib/axiosInstance";
import Loading from "../../../app/components/layout/loading";

export const ProductsDataContext = createContext({
  ProductsData: [],
  setProductsData: () => {},
});

export default function Home(props) {
  const [ProductsData, setProductsData] = useState([]);
  const products = useMemo(
    () => ({ ProductsData, setProductsData }),
    [ProductsData]
  );

  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    props.setTitle("[A] - Wszystkie produkty");
  }, [props]);

  useEffect(() => {
    axiosInstance.get("/api/admin/getProducts").then((ans) => {
      const data = ans.data;
      setProductsData(data);
      setLoadingData(false);
    });
  }, []);

  return (
    <>
      {loadingData ? (
        <Loading />
      ) : (
        <div>
          <ProductsDataContext.Provider value={products}>
            <ProductsList products={ProductsData}></ProductsList>
          </ProductsDataContext.Provider>
        </div>
      )}
    </>
  );
}
