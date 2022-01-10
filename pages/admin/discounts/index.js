import React, { createContext, useState, useMemo, useEffect } from "react";
import AddDiscountOpenModalFormButton from "../../../app/components/elements/buttons/admin/discount/addDiscountOpenModalFormButton";
import axiosInstance from "../../../app/lib/axiosInstance";
import Loading from "../../../app/components/layout/loading";
import AllDiscountsTable from "../../../app/components/elements/tables/discounts/allDiscountsTable";

export default function Home(props) {
  const [discountsData, setDiscountsData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    props.setTitle("[A] - Kody zniżkowe");
  }, [props]);
  useEffect(() => {
    axiosInstance.get("/api/discount/getDiscounts").then((ans) => {
      setDiscountsData(ans.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="d-flex justify-content-between w-100 flex-column">
      <div>
        <AddDiscountOpenModalFormButton />
      </div>

      {loading ? <Loading /> : <AllDiscountsTable discounts={discountsData} />}
    </div>
  );
}
