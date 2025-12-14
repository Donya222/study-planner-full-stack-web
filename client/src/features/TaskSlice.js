import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/tasks";


export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?email=${email}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const updateTaskDone = createAsyncThunk(
  "tasks/updateDone",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/done/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const initialState = {
  tasks: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ""
};


export const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ---------------- ADD TASK ----------------
      .addCase(addTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const newTask = action.payload.task || action.payload;
        state.tasks.push(newTask);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ---------------- GET TASKS ----------------
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.tasks = Array.isArray(action.payload)
          ? action.payload
          : action.payload.tasks;
      })
      .addCase(getTasks.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // ---------------- UPDATE TASK ----------------
      .addCase(updateTask.fulfilled, (state, action) => {
        const updated = action.payload.task || action.payload;
        const index = state.tasks.findIndex((t) => t._id === updated._id);
        if (index !== -1) state.tasks[index] = updated;
      })

      // ---------------- UPDATE DONE ----------------
      .addCase(updateTaskDone.fulfilled, (state, action) => {
        const updated = action.payload.task || action.payload;
        const index = state.tasks.findIndex((t) => t._id === updated._id);
        if (index !== -1) state.tasks[index] = updated;
      })

      // ---------------- DELETE TASK ----------------
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      });
  }
});

export default TaskSlice.reducer;
