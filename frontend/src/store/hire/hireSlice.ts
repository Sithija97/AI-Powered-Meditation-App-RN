import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IHire, IIniitalHireState } from "../../models";
import { hireService } from "../../services";

const initialState: IIniitalHireState = {
  hires: [],
  allHires: [],
  selectedHire: null,
  getHiresLoading: false,
  getHiresSuccess: false,
  getHiresError: false,
  getHiresMessage: "",
};

// get hires
export const getHires = createAsyncThunk(
  "hires/getHires",
  async (_, thunkAPI) => {
    try {
      return await hireService.getHires();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get all hires
export const getAllHires = createAsyncThunk(
  "hires/getHires",
  async (_, thunkAPI) => {
    try {
      return await hireService.getAllHires();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// add hire
export const addHire = createAsyncThunk(
  "hires/addHire",
  async (hireData: IHire, thunkAPI) => {
    try {
      return await hireService.addHire(hireData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update hire
export const updateHire = createAsyncThunk(
  "hires/updateHires",
  async (hireData: any, thunkAPI) => {
    try {
      return await hireService.updateHire(hireData.data, hireData.id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete hire
export const deleteHire = createAsyncThunk(
  "hires/deleteHire",
  async (hireId: string, thunkAPI) => {
    try {
      return await hireService.deleteHire(hireId);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const hireSlice = createSlice({
  name: "hires",
  initialState,
  reducers: {
    setSelectedHire: (state, { payload }) => {
      state.selectedHire = payload;
    },
    clearSelectedHire: (state) => {
      state.selectedHire = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getHires.pending, (state) => {
        state.getHiresLoading = true;
      })
      .addCase(getHires.fulfilled, (state, action) => {
        state.getHiresLoading = false;
        state.getHiresSuccess = true;
        state.hires = action.payload;
      })
      .addCase(getHires.rejected, (state, action) => {
        state.getHiresLoading = false;
        state.getHiresError = true;
        state.getHiresMessage = action.payload as string;
      });
  },
});

export const { setSelectedHire, clearSelectedHire } = hireSlice.actions;
export default hireSlice.reducer;
