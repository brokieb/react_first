import axiosInstance from "../../../../../../app/lib/axiosInstance";
import { Button } from "react-bootstrap";
export default function UnlinkLocalProduct({
  auctionId,
  productId,
  setLocalDetails,
}) {
  return (
    <Button
      size="sm"
      variant="danger"
      onClick={async () => {
        try {
          await axiosInstance.patch("/api/allegro/patchLocalOffer", {
            auctionId: auctionId,
            productId: null,
          });
          const updatedProduct = await axiosInstance.put(
            "/api/prods/putEditProduct",
            {
              params: {
                id: productId,
                auctionId: null,
              },
            }
          );
          setLocalDetails((oldState) => {
            return {
              ...oldState,
              productId: undefined,
            };
          });
        } catch (err) {
          //błąd
        }
      }}
    >
      ROZWIĄŻ
    </Button>
  );
}
