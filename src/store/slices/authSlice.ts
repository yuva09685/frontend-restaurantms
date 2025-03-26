import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface AuthState {
  user: {
    id: string;
    email: string;
    role: string;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// ✅ Register User Thunk
export const registerUser = createAsyncThunk(
  "auth/signup",
  async (userData: { name: string; age: number; email: string; password: string; role: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/auth/signup", userData);
      return response.data; // Ensure backend returns { user, token }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// ✅ Login User Thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", userData);
      console.log("Login Response:", response.data);
      return response.data; // Ensure backend returns { user, token }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Redux Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      return initialState; // ✅ Reset state on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Register User Cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure proper error message
      })

      // 🔹 Login User Cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure proper error message
      });
  },
});

// ✅ Export Actions & Reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
