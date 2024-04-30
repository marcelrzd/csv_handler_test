import { sendInvoices } from "@/features/api/invoiceSlice";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
// import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "../ui/toaster";

const SendInvoiceButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  const handleSendInvoices = () => {
    dispatch(sendInvoices())
      .unwrap()
      .then((response) => {
        toast({
          title: "Success!",
          variant: "success",
          description: response.status,
        });
      })
      .catch((error) => {
        console.log(`Failed to send invoices: ${error}`);
        toast({
          title: "Error!",
          variant: "destructive",
          description: error || "An unexpected error occurred", // Error message
        });
      });
  };

  return (
    <>
      <Toaster />
      <button
        onClick={handleSendInvoices}
        className="w-40 px-4 py-2 font-semibold transition-all ease-in-out rounded-lg bg-primary text-slate-50 hover:bg-primary/90"
      >
        Send Invoices
      </button>
    </>
  );
};

export default SendInvoiceButton;
