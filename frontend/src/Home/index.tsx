import DataTable from "@/components/DataTable";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../features/api/apiSlice";
import { AppDispatch, RootState } from "@/store";

import ImportCSVButton from "@/components/home/ImportCSVButton";
import SendInvoiceButton from "@/components/home/SendInvoiceButton";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.api.data);
  const status = useSelector((state: RootState) => state.api.fetchDataStatus); // check status for loading state

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-between pb-4">
        <ImportCSVButton />
        <SendInvoiceButton />
      </div>

      <DataTable data={data} status={status} />
    </>
  );
};

export default Home;
