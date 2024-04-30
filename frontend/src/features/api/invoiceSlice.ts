import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Invoice {
  id: number;
  name: string;
  email: string;
  debtAmount: number;
  debtDueDate: string;
  message?: string;
}

interface InvoiceState {
  invoices: Invoice[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InvoiceState = {
  invoices: [],
  status: "idle",
  error: null,
};

// send monthly invoices
export const sendInvoices = createAsyncThunk(
  "api/sendInvoices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/invoice/", {
        method: "POST",
      });
      const data = await response.json(); // Attempt to parse JSON first regardless of response status
      if (!response.ok) {
        // Assume the server response includes an 'error' field in JSON when not okay
        throw new Error(data.error || "Network response was not ok");
      }
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
);

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // sendInvoices
      .addCase(sendInvoices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendInvoices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(sendInvoices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default invoiceSlice.reducer;
