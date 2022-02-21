import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthApi from "src/api/auth";
import Merchant from "src/models/Merchant";
import UserProfile from "src/models/UserProfile";
import AuthInfoService from "src/services/AuthInfoService";
import { RootState } from "./store";

interface AuthState {
  listMerchant: Merchant[] | null;
  profile: UserProfile | null;
  selectedMerchant: string | null;
}

const initialState: AuthState = {
  listMerchant: null,
  profile: null,
  selectedMerchant: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveSelectedMerchant: (state, action: PayloadAction<string | null>) => {
      state.selectedMerchant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(fetchMerchant.fulfilled, (state, action) => {
        const listMerchant = action.payload;
        state.listMerchant = listMerchant;
        // if (
        //   !state.selectedMerchant &&
        //   listMerchant &&
        //   listMerchant.length >= 1
        // ) {
        //   state.selectedMerchant = listMerchant[0]?.code;
        // }
      })
      .addCase(fetchMerchantAndProfile.fulfilled, (state, action) => {
        const listMerchant = action.payload[0];
        state.listMerchant = listMerchant;
        state.profile = action.payload[1];
        // if (
        //   !state.selectedMerchant &&
        //   listMerchant &&
        //   listMerchant.length >= 1
        // ) {
        //   state.selectedMerchant = listMerchant[0]?.code;
        // }
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.listMerchant = null;
        state.selectedMerchant = null;
        state.profile = null;
      });
  },
});

// Async Action
export const fetchProfile = createAsyncThunk("auth/getProfile", async () => {
  const profileRes = await AuthApi.getProfile();
  console.log("profileRes", profileRes);
  return profileRes?.data;
});

export const fetchMerchant = createAsyncThunk("auth/getMerchant", async () => {
  const merchantRes = await AuthApi.getMerchant();
  console.log("merchantRes", merchantRes);
  return merchantRes?.data;
});

export const fetchMerchantAndProfile = createAsyncThunk(
  "auth/getMerchantAndProfile",
  async () => {
    const res = await Promise.all([
      AuthApi.getMerchant(),
      AuthApi.getProfile(),
    ]);
    return res;
  }
);

export const logout = createAsyncThunk("atth/logout", async () => {
  const logoutRes = await AuthApi.logout();
  AuthInfoService.clearTokenInfo();
  window.location.href = "/login";
  return logoutRes?.data;
});

export const { saveSelectedMerchant } = AuthSlice.actions;

export const selectProfile = (state: RootState): UserProfile | null =>
  state.auth.profile;
export const selectListMerchant = (state: RootState): Merchant[] | null =>
  state.auth.listMerchant;

export const selectSelectedMerchantCode = (state: RootState): string | null =>
  state.auth.selectedMerchant;

export const selectSelectedMerchant = (state: RootState): Merchant | null => {
  const merchantCode = state.auth.selectedMerchant;
  if (!merchantCode || !state.auth.listMerchant) {
    return null;
  }
  return (
    state.auth.listMerchant.find((item) => item.code === merchantCode) || null
  );
};

export default AuthSlice.reducer;
