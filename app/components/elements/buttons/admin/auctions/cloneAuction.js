import React, { useState, useContext, useEffect } from "react";
import axiosInstance from "../../../../../../app/lib/axiosInstance";
import { AuctionsContext } from "../../../../../../pages/admin/auctions/index";
import { Button } from "react-bootstrap";
import PopAlert from "../../../../../../app/components/modules/popAlert";
import GetData from "../../../../../../app/components/modules/getData";
import Loading from "../../../../../../app/components/layout/loading";
export default function CloneAuction({ auction }) {
  const [remote, setRemote] = useState(true);
  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState({});
  const [data, setData] = useState({});
  const { auctionsData, setAuctionsData } = useContext(AuctionsContext);

  useEffect(() => {
    if (auctionsData) {
      const ans = GetData(
        auctionsData,
        auction.id,
        axiosInstance.get("/api/allegro/getOffer", {
          params: {
            offerId: auction.id,
          },
        }),
        "id"
      ).then((items) => {
        setData(items);
        setLoading(false);
      });
    }
  }, [auction]);

  function SelectButton() {
    switch (data.source) {
      case "LOCAL":
        return (
          <Button
            size="sm"
            variant="success"
            onClick={async () => {
              try {
                const offer = await axiosInstance.get("/api/allegro/getOffer", {
                  params: {
                    _id: data._id,
                  },
                });

                const sendedOffer = await axiosInstance.post(
                  "/api/allegro/postOffer",
                  {
                    data: {
                      offer: offer.data,
                    },
                  }
                );
                setAlertData({
                  variant: "success",
                  title: "Sukces",
                  body: "Poprawnie dodano",
                  cb: () => {
                    setAlertData({});
                  },
                });
              } catch (err) {
                setAlertData({
                  variant: "danger",
                  title: "danger",
                  error: err.response.status,
                  body: {
                    401: "nie masz uprawnień",
                    default: "Inny błąd",
                  },
                  cb: () => {
                    setAlertData({});
                  },
                });
              }
            }}
          >
            WYŚLIJ
          </Button>
        );
      case "REMOTE":
        return (
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              axiosInstance
                .get("/api/allegro/getOffer", {
                  params: {
                    offerId: auction.id,
                  },
                })
                .then((items) => {
                  axiosInstance.post("/api/allegro/postAuction", {
                    auction: items.data,
                  });
                })
                .finally((ans) => {
                  setAlertData({
                    variant: "success",
                    title: "Sukces",
                    body: "Poprawnie dodano",
                    cb: () => {
                      setAlertData({});
                    },
                  });
                })
                .catch((err) => {
                  setAlertData({
                    variant: "danger",
                    title: "danger",
                    error: 405,
                    body: {
                      401: "nie masz uprawnien",
                      default: "asdasd",
                    },
                    cb: () => {
                      setAlertData({});
                    },
                  });
                });
            }}
          >
            POBIERZ
          </Button>
        );
      case "SYNC":
        return (
          <Button disabled={true} size="sm" variant="success">
            SYNCED
          </Button>
        );
      default:
        return <>DUS{data.source}</>;
    }
  }
  useEffect(() => {
    if (auctionsData) {
      SelectButton();
      setLoading(false);
    }
  }, [data]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <PopAlert data={alertData} />
      <div>
        <SelectButton />
      </div>
    </>
  );
}
