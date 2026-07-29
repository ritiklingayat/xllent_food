import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authApi from "@/api/authApi";

/* ============================================================
   Initial State
============================================================ */

const initialState = {
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
  loading: false,
  error: null,
};

/* ============================================================
   LOGIN
============================================================ */

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authApi.login(credentials);

      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        data.refreshToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "userRole",
        data.user.role
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  }
);

/* ============================================================
   CURRENT USER
============================================================ */

export const fetchCurrentUser = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.getProfile();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Unable to load profile"
      );
    }
  }
);

/* ============================================================
   LOGOUT
============================================================ */

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    try {
      await authApi.logout();
    } catch (_) {}

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
  }
);

/* ============================================================
   Slice
============================================================ */

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearAuthError(state) {
      state.error = null;
    },

    restoreUser(state) {
      const user = localStorage.getItem("user");

      if (user) {
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
      }
    },
  },

  extraReducers: (builder) => {
    builder

      /* Login */

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.accessToken =
          action.payload.accessToken;

        state.refreshToken =
          action.payload.refreshToken;

        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Current User */

      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user ?? action.payload;
        state.isAuthenticated = true;
      })

      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      /* Logout */

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const {
  clearAuthError,
  restoreUser,
} = authSlice.actions;

export default authSlice.reducer;