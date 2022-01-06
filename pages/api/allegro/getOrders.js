import User from "model/users";
import Cart from "model/carts";
import Product from "model/product";
import Auctions from "model/allegroAuctions";
import dbConnect from "app/lib/dbConnect";
import { getSession } from "next-auth/react";
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import axiosInstance, { allegroAxios } from "app/lib/axiosInstance";
export default async function handler(req, res) {
  const session = await getSession({ req });
  await dbConnect();
  if (req.method === "GET") {
    const readyData = req.query;

    const tokenData = await axiosInstance.get("/api/settings/getSettings", {
      params: {
        code: "allegroAccessToken",
      },
    });

    const localOrders = await axiosInstance.get("/api/order/getAdminOrders", {
      params: {
        limit: 1,
        orderSource: "ALLEGRO",
      },
    });
    let allegroOrders = [];
    try {
      let newestId = localOrders.data[0] ? localOrders.data[0].foreignId : 0;
      allegroOrders = await allegroAxios.get("/order/events", {
        params: {
          from: newestId,
        },
        headers: {
          Authorization: `Bearer ${tokenData.data.allegroAccessToken.value}`,
          Accept: "application/vnd.allegro.public.v1+json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } catch (err) {
      return res.status(401).json({ err: "Błąd autoryzacji z allegro" });
    }
    let counter = 0;
    for (const allegroOrder of allegroOrders.data.events) {
      if (allegroOrder.type == "READY_FOR_PROCESSING") {
        counter += 1;
        const processOrderDetails = await allegroAxios.get(
          `/order/checkout-forms/${allegroOrder.order.checkoutForm.id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenData.data.allegroAccessToken.value}`,
              Accept: "application/vnd.allegro.public.v1+json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        const processOrder = allegroOrder.order;
        let totalValue = 0;
        try {
          const newOrder = await axiosInstance.post("/api/order/postNewOrder", {
            params: {
              user: {
                name: processOrder.buyer.login,
                email: processOrder.buyer.email,
              },
              products: await Promise.all(
                processOrder.lineItems.map(async (product) => {
                  totalValue += product.price.amount * product.quantity;
                  //ustalenie id produktu
                  const localAuction = await axiosInstance.get(
                    "/api/allegro/getLocalOffer",
                    {
                      params: {
                        foreignId: product.offer.id,
                      },
                    }
                  );
                  return {
                    productId: localAuction.data.productId
                      ? localAuction.data.productId
                      : "0",
                    productTitle: product.offer.name,
                    productQty: product.quantity,
                    productPrice: product.price.amount,
                    productValue: product.price.amount * product.quantity,
                    productStatus: "NEW",
                  };
                })
              ),
              totalValue: totalValue,
              orderComment: processOrderDetails.data.messageToSeller,
              orderSource: "ALLEGRO",
              orderStatus: "PAID",
              foreignId: allegroOrder.id,
            },
          });
        } catch (err) {
          return res
            .status(400)
            .json({ mess: "Wystąpił błąd przy pobieraniu zamówień" });
        }
      }
    }
    if (counter == 0) {
      return res.status(200).json({ mess: "brak nowych zamówień" });
    } else {
      return res.status(200).json({ mess: "dodano nowe zamówienia" });
    }
  } else {
    return res.status(402).json({ err: "WRONG METHOD", code: "WRONG_METHOD" });
  }
}
