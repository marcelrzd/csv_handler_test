import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface DataItem {
  id: number;
  name: string;
  file_type: string;
  file_size: number;
  file_size_mb: number;
  uploaded_at: string;
}

interface ApiState {
  data: DataItem[];
  fetchDataStatus: "idle" | "loading" | "succeeded" | "failed";
  uploadStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ApiState = {
  data: [],
  fetchDataStatus: "idle",
  uploadStatus: "idle",

  error: null,
};

// Fetch data from the API
export const fetchData = createAsyncThunk("api/fetchData", async () => {
  const response = await fetch("http://127.0.0.1:8000/api/csv/");
  return await response.json();
});

// Post the CSV file to the API
export const uploadFile = createAsyncThunk(
  "api/uploadFile",
  async (file: File, { dispatch }) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:8000/api/csv/", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      await dispatch(fetchData());
      return await response.json();
    } else {
      throw new Error("Failed to upload file");
    }
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchData
      .addCase(fetchData.pending, (state) => {
        state.fetchDataStatus = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.fetchDataStatus = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.fetchDataStatus = "failed";
        state.error = action.error.message || null;
      })
      // Upload file
      .addCase(uploadFile.pending, (state) => {
        state.uploadStatus = "loading";
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.uploadStatus = "succeeded";
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default apiSlice.reducer;
