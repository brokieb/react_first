import axiosInstance from "../../../app/lib/axiosInstance";
import { useState, useEffect, createContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import Loading from "../../../app/components/layout/loading";
import CartSummary from "../../../app/components/elementsGroups/cart/cartSummary";

export const CartDataContext = createContext({
  cartData: [],
  setCartData: () => {},
});
export default function Home(props) {
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies(["cart"]);
  const [cartData, setCartData] = useState([]);
  const cart = useMemo(() => ({ cartData, setCartData }), [cartData]);
  useEffect(() => {
    props.setTitle("Koszyk");
  }, [props]);
  useEffect(() => {
    axiosInstance
      .get("/api/cart/getCartItems", {
        params: {
          cart: cookies.cartId ? cookies.cartId : null,
        },
      })
      .then((res) => {
        setCartData(res.data.main);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <CartDataContext.Provider value={cart}>
        {loading ? <Loading /> : <CartSummary cartData={cartData} />}
      </CartDataContext.Provider>
    </div>
  );
}
