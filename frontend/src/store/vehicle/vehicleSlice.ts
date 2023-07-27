import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { vehicleService } from "../../services";

const initialState = {
  vehicleInfo: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get vehicles
export const getVehiclesData = createAsyncThunk(
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

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getVehiclesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVehiclesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicleInfo = action.payload;
      })
      .addCase(getVehiclesData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export default vehicleSlice.reducer;
