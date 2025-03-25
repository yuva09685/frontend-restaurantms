import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Table {
  id: string;
  number: number;
  status: string;
  waiter?: string;
}

interface TableState {
  tables: Table[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TableState = {
  tables: [],
  loading: false,
  error: null,
};

// Async Thunk to Fetch Tables
export const fetchTables = createAsyncThunk("tables/fetchTables", async () => {
  const response = await axios.get("http://localhost:3000/waiters/tables");
  return response.data;
});

const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload;
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load tables";
      });
  },
});

export default tableSlice.reducer;
