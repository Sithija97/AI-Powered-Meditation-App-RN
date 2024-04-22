import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services";
import {
  IInitialAuthState,
  userLoginData,
  userRegistrationData,
} from "../../models";

const initialState: IInitialAuthState = {
  userInfo: null,
  selectedUser: null,
  allRegisteredUsers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isgetAllUsersLoading: false,
  isgetAllUsersSuccess: false,
  isgetAllUsersError: false,
  message: "",
};

// register user
export const register = createAsyncThunk(
  "auth/register",
  async (userData: userRegistrationData, thunkAPI) => {
    try {
      return await authService.userRegistration(userData);
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

// login user
export const login = createAsyncThunk(
  "auth/login",
  async (userData: userLoginData, thunkAPI) => {
    try {
      return await authService.userLogin(userData);
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

// get all users
export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, thunkAPI) => {
    try {
      return await authService.getAllRegisteredUsers();
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

// update user
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData: any, thunkAPI) => {
    try {
      return await authService.updateUserData(userData.id, userData.data);
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

// delete user
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId: string, thunkAPI) => {
    try {
      return await authService.deleteUserData(userId);
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    setSelectedUser: (state, { payload }) => {
      state.selectedUser = payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isgetAllUsersLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isgetAllUsersLoading = false;
        state.isgetAllUsersSuccess = true;
        state.allRegisteredUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isgetAllUsersLoading = false;
        state.isgetAllUsersError = true;
        state.message = action.payload as string;
      });
  },
});

export const {
  setCredentials,
  logout,
  reset,
  setSelectedUser,
  clearSelectedUser,
} = authSlice.actions;

export default authSlice.reducer;
