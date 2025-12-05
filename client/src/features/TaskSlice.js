import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/tasks"; 

export const addTask = createAsyncThunk("tasks/addTask", async (taskData, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, taskData);
    return response.data;
  } catch (error) {
    console.error("Add Task Error:", error.response || error); 
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const getTasks = createAsyncThunk("tasks/getTasks", async (email, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}?email=${email}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const updateTask = createAsyncThunk("tasks/updateTask", async ({ id, taskData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, taskData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

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

 
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = Array.isArray(action.payload) ? action.payload : action.payload.tasks; 
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Update Task
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isSuccess = true;
        const updatedTask = action.payload.task || action.payload;
        const idx = state.tasks.findIndex((t) => t._id === updatedTask._id);
        if (idx !== -1) state.tasks[idx] = updatedTask;
      })

      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      });
  }
});

export default TaskSlice.reducer;



