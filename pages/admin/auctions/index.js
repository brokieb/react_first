import react, { useEffect, useState, createContext, useMemo } from "react";
import { Alert } from "react-bootstrap";
import axiosInstance from "../../../app/lib/axiosInstance";
import AllOrdersTable from "../../../app/components/elements/tables/orders/allOrdersTable";
import Loading from "../../../app/components/layout/loading";
import AuctionsListTable from "../../../app/components/elements/tables/auctions/auctionsListTable";

export const AuctionsContext = createContext({
  auctionsData: [],
  setAuctionsData: () => {},
});
export default function Home(props) {
  useEffect(() => {
    props.setTitle("[A] - Aukcje");
  }, [props]);
  const [auctionsData, setAuctionsData] = useState([]);
  const auctions = useMemo(
    () => ({ auctionsData, setAuctionsData }),
    [auctionsData]
  );
  const [loading, setLoading] = useState(true);
  const [auth, isAuth] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/api/allegro/getOffers")
      .then((item) => {
        setAuctionsData(item.data);
        setLoading(false);
      })
      .catch((err) => {});

    const access = axiosInstance
      .get("/api/allegro/getLogin")
      .then((item) => {
        if (item.status != 200) {
          isAuth(false);
        }
      })
      .catch((err) => {
        isAuth(false);
      });
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <AuctionsContext.Provider value={auctions}>
      <div className="w-100">
        {!auth && (
          <Alert variant="danger">
            <Alert.Heading>Błąd połączenia z allegro</Alert.Heading>
            <p>
              Twoje połączenie z serwisem allegro nie jest aktywne, przejdź do
              Ustawień i połącz się ponownie. Jeżeli błąd będzie dalej
              występował skontaktuj się z administratorem
            </p>
          </Alert>
        )}
        <AuctionsListTable items={auctionsData} />
      </div>
    </AuctionsContext.Provider>
  );
}
