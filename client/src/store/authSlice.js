import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://localhost:8000/api"; // Update with your backend URL

export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/users/me`, {
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

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      const { token, ...userUpdates } = userData;
      const response = await axios.put(`${API_URL}/users`, userUpdates, {
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

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (token, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await AsyncStorage.removeItem("token");
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add new reminder
export const addReminder = createAsyncThunk(
  "auth/addReminder",
  async ({ token, reminder }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/reminder`, reminder, {
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

// Add new care team member
export const addCareTeamMember = createAsyncThunk(
  "auth/addCareTeamMember",
  async ({ token, careTeamMember }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/care-team`,
        careTeamMember,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add new medical information
export const addMedicalInformation = createAsyncThunk(
  "auth/addMedicalInformation",
  async ({ token, medicalInformation }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/medical-information`,
        medicalInformation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add new health metric
export const addHealthMetric = createAsyncThunk(
  "auth/addHealthMetric",
  async ({ token, healthMetric }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/health-metric`,
        healthMetric,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add new activity log
export const addActivityLog = createAsyncThunk(
  "auth/addActivityLog",
  async ({ token, activityLog }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/activity-log`,
        activityLog,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add new emergency contact
export const addEmergencyContact = createAsyncThunk(
  "auth/addEmergencyContact",
  async ({ token, emergencyContact }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/emergency-contact`,
        emergencyContact,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add weight
export const addWeight = createAsyncThunk(
  "auth/addWeight",
  async ({ token, weight, userId }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/users/weight`,
        { weight, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add steps
export const addSteps = createAsyncThunk(
  "auth/addSteps",
  async ({ token, steps, userId }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/users/steps`,
        { steps, userId, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add exercise
export const addExercise = createAsyncThunk(
  "auth/addExercise",
  async ({ token, exercise, userId }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/users/exercise`,
        { exercise, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add mental exercise
export const addMentalExercise = createAsyncThunk(
  "auth/addMentalExercise",
  async ({ token, mentalExercise, userId }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/users/mental-exercise`,
        { mentalExercise, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userToken: null,
    userInfo: null,
    error: null,
  },
  reducers: {
    setAuthState: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userToken = action.payload.userToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userToken = null;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.userToken = null;
        state.userInfo = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addReminder.fulfilled, (state, action) => {
        state.userInfo.reminders = action.payload;
      })
      .addCase(addReminder.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addCareTeamMember.fulfilled, (state, action) => {
        state.userInfo.careTeam = action.payload;
      })
      .addCase(addCareTeamMember.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addMedicalInformation.fulfilled, (state, action) => {
        state.userInfo.medicalInformation = action.payload;
      })
      .addCase(addMedicalInformation.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addHealthMetric.fulfilled, (state, action) => {
        state.userInfo.healthMetrics = action.payload;
      })
      .addCase(addHealthMetric.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addActivityLog.fulfilled, (state, action) => {
        state.userInfo.activityLog = action.payload;
      })
      .addCase(addActivityLog.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addEmergencyContact.fulfilled, (state, action) => {
        state.userInfo.emergencyContacts = action.payload;
      })
      .addCase(addEmergencyContact.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addWeight.fulfilled, (state, action) => {
        state.userInfo.weight = action.payload;
      })
      .addCase(addWeight.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addSteps.fulfilled, (state, action) => {
        state.userInfo.steps = action.payload;
      })
      .addCase(addSteps.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addExercise.fulfilled, (state, action) => {
        state.userInfo.exercise = action.payload;
      })
      .addCase(addExercise.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addMentalExercise.fulfilled, (state, action) => {
        state.userInfo.MentalExercise = action.payload;
      })
      .addCase(addMentalExercise.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setAuthState, logout } = authSlice.actions;

export const checkAuthState = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch(setAuthState({ isAuthenticated: true, userToken: token }));
    dispatch(getUserInfo(token));
    console.log("user is Authenticated");
  } else {
    dispatch(setAuthState({ isAuthenticated: false, userToken: null }));
  }
};

export default authSlice.reducer;
