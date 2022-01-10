import { useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { increment } from "../../../../../app/features/counter/counterSlice";
import { useCookies } from "react-cookie";
import axiosInstance from "../../../../../app/lib/axiosInstance";
import { useSession } from "next-auth/react";
import PopAlert from "../../../../../app/components/modules/popAlert";

export default function AddToCardButton(props) {
  const dispatch = useDispatch();
  const [alertData, setAlertData] = useState({});
  const { data: session, status } = useSession();
  const [cookies, setCookie] = useCookies(["cart"]);

  function addToCardHandler() {
    axiosInstance
      .put("/api/cart/putAddCardProduct", {
        params: {
          productId: props._id,
          cart: cookies.cartId,
        },
      })
      .then((res) => {
        setAlertData({
          variant: "success",
          title: "Sukces",
          body: "Poprawnie dodano produkt do koszyka!",
          cb: () => {
            switch (res.data.status) {
              case "NEW_COOKIE_CART":
                setCookie("cartId", res.data.items._id, { path: "/" });
                dispatch(increment());
                break;
              case "NEW_SESSION_CART":
                dispatch(increment());
                break;
              case "NEW_ITEM":
                dispatch(increment());
                break;
              case "EXISTING_ITEM":
                break;
            }
            setAlertData({});
          },
        });
      })
      .catch((err) => {
        setAlertData({
          variant: "danger",
          title: "Błąd",
          body: "Nie udało się dodać produktu do koszyka!",
          cb: () => {
            setAlertData({});
          },
        });
      });
  }

  return (
    <Button variant="outline" onClick={addToCardHandler}>
      <FontAwesomeIcon icon={faCartPlus} size="lg" />
      <PopAlert data={alertData} />
    </Button>
  );
}
