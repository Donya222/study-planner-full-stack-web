import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("users/getUser", async (udata) => {
  try {
    const response = await axios.post("http://localhost:5000/login", udata);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const addUser = createAsyncThunk("users/addUser", async (udata) => {
  try {
    const response = await axios.post("http://localhost:5000/register", udata);
    return response.data.message;
  } catch (error) {
    console.log(error);
  }
});

// ⭐ UPDATE PROFILE
export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/profile/${id}`,
        data
      );
      return response.data.user; // ← updated user
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const initVal = {
  user: {},
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const UserSlice = createSlice({
  name: "users",
  initialState: initVal,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ADD USER
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(addUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // LOGIN (GET USER)
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // ⭐ UPDATE PROFILE
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // ← store updated user
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default UserSlice.reducer;
