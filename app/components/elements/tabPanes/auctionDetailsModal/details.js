import { Formik } from "formik";
import { Row, Col, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import axiosInstance from "app/lib/axiosInstance";
export default function Details({ auction }) {
  const [disabledState, setDisabledState] = useState(true);
  const [categories, setCategories] = useState("ładowanie...");
  useEffect(() => {
    if (auction.source == "SYNC") {
      setDisabledState(false);
    }

    async function CategoryTree() {
      let ans = [];
      let last = auction.category.id;
      while (last != 0) {
        try {
          const data = await axiosInstance.get("/api/allegro/getCategory", {
            params: {
              categoryId: last,
            },
          });
          last = data.data.parent ? data.data.parent.id : 0;
          ans.unshift(data.data.name);
        } catch (err) {
          last = 0;
          return auction.category.id;
        }
      }

      return ans.join("/");
    }
    CategoryTree().then((item) => {
      setCategories(item);
    });
  }, []);

  return (
    <>
      {disabledState && (
        <>
          FORMULARZ JEST TYLKO DO ODCZYTU <button>AAA</button>
        </>
      )}
      <Row>
        <Col>
          <h3>DAMIAN WOXNIAK</h3>
          <ul>
            <li>
              Cena{" "}
              <strong>
                {auction.sellingMode.price.amount}{" "}
                {auction.sellingMode.price.currency}
              </strong>
            </li>
            {auction.stock && (
              <li>
                Ilość <strong>{auction.stock.available}</strong>
              </li>
            )}
            {auction.stats && (
              <li>
                Wyświetlenia <strong>{auction.stats.visitsCount}</strong>
              </li>
            )}
            {auction.stock && (
              <li>
                Sprzedano <strong>{auction.stock.sold}</strong>
              </li>
            )}
            {auction.publication && (
              <li>
                Stan <strong>{auction.publication.status}</strong>
              </li>
            )}

            <li>
              Kategoria <strong>{categories}</strong>
            </li>
            {auction.delivery.shippingRates && (
              <li>
                Dostawa <strong>{auction.delivery.shippingRates.id}</strong>
              </li>
            )}
            <li>
              Źródło <strong>{auction.source}</strong>
            </li>
          </ul>
        </Col>
        <Col>
          {auction.primaryImage && (
            <Image src={auction.primaryImage.url} className="w-100" />
          )}
        </Col>
      </Row>
    </>
  );
}
