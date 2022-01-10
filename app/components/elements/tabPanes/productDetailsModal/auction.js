import { useRef, useState, useEffect } from "react";
import axiosInstance from "../../../../../app/lib/axiosInstance";
export default function Auction(props) {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    axiosInstance.get("/api/allegro/getOffers").then((item) => {
      setOffers(item.data.offers);
    });
  }, []);
  return <>DIS</>;
}
