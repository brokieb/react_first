import axiosInstance from "../../../../../app/lib/axiosInstance";
import AuctionEditorForm from "../../../../../app/components/elements/forms/admin/auctions/auctionEditorForm";
import Loading from "../../../../../app/components/layout/loading";
import { useState, useEffect } from "react";
export default function Auction({ auction }) {
  const [auctionDetails, setAuctionDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/api/allegro/getOffer", {
        params: {
          offerId: auction.id,
        },
      })
      .then((ans) => {
        setAuctionDetails(ans.data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <AuctionEditorForm auctionDetails={auctionDetails} />
      )}
    </>
  );
}
