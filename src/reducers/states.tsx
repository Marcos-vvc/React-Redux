import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Url } from "../constants/baseUrl";
import {
  IBGECITYResponse,
  IBGEDISTRICTSResponse,
  IBGEUFResponse,
} from "../types/types";
import { initialState } from "./initialState";

export const getStates = createAsyncThunk<IBGEUFResponse[]>(
  "states",
  async () => {
    const response = await axios.get(`${Url}/estados`);
    const { data } = response;
    return data;
  }
);

export const getCounties = createAsyncThunk(
  "counties",
  async (selectedUf: string) => {
    const response = await axios.get(`${Url}/estados/${selectedUf}/municipios`);
    const { data } = response;
    return data;
  }
);

export const getDistricts = createAsyncThunk(
  "districts",
  async (selectedMu: string) => {
    const response = await axios.get(`${Url}/municipios/${selectedMu}/distritos`);
    const { data } = response;
    return data;
  }
);
type STATE = {
  app: {
    loading: boolean;
    states: IBGEUFResponse[];
    counties: IBGECITYResponse[];
    districts: IBGEDISTRICTSResponse[];
    error: boolean;
  };
};

export const allActionsSlice = createSlice({
  name: "app",
  initialState: initialState() as STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStates.pending, (state, action) => {
      state.app.loading = true;
    });
    builder.addCase(getStates.fulfilled, (state, action) => {
      state.app.loading = false;
      state.app.states = action.payload;
    });
    builder.addCase(getStates.rejected, (state, action) => {
      state.app.loading = false;
      state.app.error = true;
    });

    builder.addCase(getCounties.pending, (state, action) => {
      state.app.loading = true;
    });
    builder.addCase(getCounties.fulfilled, (state, action) => {
      state.app.loading = false;
      state.app.counties = action.payload;
    });
    builder.addCase(getCounties.rejected, (state, action) => {
      state.app.loading = false;
      state.app.error = true;
    });

    builder.addCase(getDistricts.pending, (state, action) => {
      state.app.loading = true;
    });
    builder.addCase(getDistricts.fulfilled, (state, action) => {
      state.app.loading = false;
      state.app.districts = action.payload;
    });
    builder.addCase(getDistricts.rejected, (state, action) => {
      state.app.loading = false;
      state.app.error = true;
    });
  },
});

export const selectApp = (state: STATE) => state;

export default allActionsSlice.reducer;
