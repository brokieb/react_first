import { Formik } from "formik";
import { Row, Col, Image, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axiosInstance from "../../../../../app/lib/axiosInstance";
import Loading from "../../../../../app/components/layout/loading";
import UnlinkLocalProduct from "../../../../../app/components/elements/buttons/admin/auctions/unlinkLocalProduct";
import LinkLocalProduct from "../../../../../app/components/elements/forms/admin/auctions/linkLocalProduct";
export default function Details({ auction }) {
  const [disabledState, setDisabledState] = useState(true);
  const [categories, setCategories] = useState("ładowanie...");
  const [localDetails, setLocalDetails] = useState({});
  const [localDetailsLoader, setLocalDetailsLoader] = useState(true);
  useEffect(() => {
    async function getLocalDetails() {
      const localData = await axiosInstance.get("/api/allegro/getLocalOffer", {
        params: {
          foreignId: auction.id,
        },
      });
      return localData.data;
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

    if (auction.source == "SYNC") {
      setDisabledState(false);
    }

    CategoryTree().then((item) => {
      setCategories(item);
    });

    getLocalDetails().then((item) => {
      setLocalDetails(item);

      setLocalDetailsLoader(false);
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
          <h3>{auction.name}</h3>
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
            {auction.delivery && auction.delivery.shippingRates && (
              <li>
                Dostawa <strong>{auction.delivery.shippingRates.id}</strong>
              </li>
            )}
            <li>
              Źródło <strong>{auction.source}</strong>
            </li>
          </ul>
          <div className="border d-flex flex-row mx-3 p-2 gap-3">
            {localDetailsLoader ? (
              <Loading />
            ) : localDetails ? (
              localDetails.productId ? (
                <>
                  <img
                    src={localDetails.productId.imageUrl}
                    style={{ height: "60px" }}
                  ></img>
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>{localDetails.productId.title}</strong>
                        <small className="ps-2">
                          {localDetails.productId.SKU}
                        </small>
                      </div>
                      <div>
                        <UnlinkLocalProduct
                          productId={localDetails.productId._id}
                          auctionId={localDetails._id}
                          setLocalDetails={setLocalDetails}
                        />
                      </div>
                    </div>
                    <p>{localDetails.productId.price} zł</p>
                  </div>
                </>
              ) : (
                <LinkLocalProduct
                  auctionId={localDetails._id}
                  setLocalDetails={setLocalDetails}
                />
              )
            ) : (
              <>Aukcja nie istnieje, najpierw ją pobierz</>
            )}
          </div>
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
