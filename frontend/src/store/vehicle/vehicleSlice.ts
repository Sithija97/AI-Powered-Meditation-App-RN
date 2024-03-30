import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { vehicleService } from "../../services";
import { IInitialVehicleState, IVehicle } from "../../models";

const initialState: IInitialVehicleState = {
  vehicleInfo: [],
  selectedVehicle: null,
  getVehiclesError: false,
  getVehiclesSuccess: false,
  getVehiclesLoading: false,
  getVehiclesMessage: "",
  addVehicleError: false,
  addVehicleSuccess: false,
  addVehicleLoading: false,
  addVehicleMessage: "",
  deleteVehicleError: false,
  deleteVehicleSuccess: false,
  deleteVehicleLoading: false,
  deleteVehicleMessage: "",
};

// get vehicles
export const getVehicles = createAsyncThunk(
  "vehicles/getVehicles",
  async (_, thunkAPI) => {
    try {
      return await vehicleService.getVehicles();
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

// add vehicle
export const addVehicle = createAsyncThunk(
  "vehicles/addVehicle",
  async (vehicleData: IVehicle, thunkAPI) => {
    try {
      console.log("slice :", vehicleData);
      return await vehicleService.addVehicle(vehicleData);
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

// delete vehicle
export const deleteVehicle = createAsyncThunk(
  "vehicles/deleteVehicle",
  async (vehicleId: string, thunkAPI) => {
    try {
      return await vehicleService.deleteVehicle(vehicleId);
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

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setSelectedVehicle: (state, { payload }) => {
      state.selectedVehicle = payload;
    },
    clearSelectedVehicle: (state) => {
      state.selectedVehicle = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getVehicles.pending, (state) => {
        state.getVehiclesLoading = true;
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.getVehiclesLoading = false;
        state.getVehiclesSuccess = true;
        state.vehicleInfo = action.payload;
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.getVehiclesLoading = false;
        state.getVehiclesError = true;
        state.getVehiclesMessage = action.payload as string;
      })
      .addCase(addVehicle.pending, (state) => {
        state.addVehicleLoading = true;
      })
      .addCase(addVehicle.fulfilled, (state) => {
        state.addVehicleLoading = false;
        state.addVehicleSuccess = true;
      })
      .addCase(addVehicle.rejected, (state, action) => {
        state.addVehicleLoading = false;
        state.addVehicleError = true;
        state.addVehicleMessage = action.payload as string;
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.deleteVehicleLoading = true;
      })
      .addCase(deleteVehicle.fulfilled, (state) => {
        state.deleteVehicleLoading = false;
        state.deleteVehicleSuccess = true;
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.deleteVehicleLoading = false;
        state.deleteVehicleError = true;
        state.deleteVehicleMessage = action.payload as string;
      });
  },
});

export const { setSelectedVehicle, clearSelectedVehicle } =
  vehicleSlice.actions;
export default vehicleSlice.reducer;
