// Redux Thunks and Slice for Task Management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/tasks";

export const fetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async ({ token, taskId }, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/single/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response:");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ token, date }, thunkAPI) => {
    try {
      console.log(`Attempting to fetch tasks for date: ${date.toISOString()}`);
      const response = await axios.get(`${API_URL}/${date.toISOString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Tasks fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Failed to fetch tasks:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching tasks"
      );
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ token, taskData }, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ token, taskId, updateData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${taskId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ token, taskId }, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return taskId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    currentTask: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Handle the pending state for fetching tasks
      .addCase(fetchTasks.pending, (state) => {
        console.log("Fetching tasks...");
        state.loading = true;
      })
      // Handle the fulfilled state for fetching tasks
      .addCase(fetchTasks.fulfilled, (state, action) => {
        console.log("Fetched tasks successfully:", action.payload);
        state.tasks = action.payload;
        state.loading = false;
      })
      // Handle the rejected state for fetching tasks
      .addCase(fetchTasks.rejected, (state, action) => {
        console.error("Failed to fetch tasks:", action.payload);
        state.error = action.payload;
        state.loading = false;
      })
      // Handle the pending state for fetching a single task
      .addCase(fetchTaskById.pending, (state) => {
        console.log("Fetching task by ID...");
        state.loading = true;
      })
      // Handle the fulfilled state for fetching a single task
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        console.log("Fetched task by ID successfully:", action.payload);
        state.currentTask = action.payload;
        state.loading = false;
      })
      // Handle the rejected state for fetching a single task
      .addCase(fetchTaskById.rejected, (state, action) => {
        console.error("Failed to fetch task by ID:", action.payload);
        state.error = action.payload;
        state.loading = false;
      })
      // Handle the fulfilled state for creating a task
      .addCase(createTask.fulfilled, (state, action) => {
        console.log("Created a new task:", action.payload);
        state.tasks.push(action.payload);
      })
      // Handle the fulfilled state for updating a task
      .addCase(updateTask.fulfilled, (state, action) => {
        console.log("Updated task successfully:", action.payload);
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      // Handle the fulfilled state for deleting a task
      .addCase(deleteTask.fulfilled, (state, action) => {
        console.log("Deleted task with ID:", action.payload);
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
