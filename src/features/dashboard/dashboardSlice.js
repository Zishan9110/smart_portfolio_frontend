import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosClient';

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/dashboard/stats');
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to load stats');
    }
  }
);

export const fetchProjectAnalytics = createAsyncThunk(
  'dashboard/fetchProjectAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/dashboard/project-analytics');
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to load project analytics');
    }
  }
);

export const fetchSkillsAnalytics = createAsyncThunk(
  'dashboard/fetchSkillsAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/dashboard/skills-analytics');
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to load skills analytics');
    }
  }
);

export const fetchViewsAnalytics = createAsyncThunk(
  'dashboard/fetchViewsAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/dashboard/views-analytics');
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to load views analytics');
    }
  }
);

export const fetchRecentActivities = createAsyncThunk(
  'dashboard/fetchActivities',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/dashboard/activities');
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to load activity');
    }
  }
);

const initialState = {
  stats: null,
  projectAnalytics: null,
  skillsAnalytics: null,
  viewsAnalytics: null,
  activities: [],
  status: 'idle',
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchProjectAnalytics.fulfilled, (state, action) => {
        state.projectAnalytics = action.payload;
      })
      .addCase(fetchSkillsAnalytics.fulfilled, (state, action) => {
        state.skillsAnalytics = action.payload;
      })
      .addCase(fetchViewsAnalytics.fulfilled, (state, action) => {
        state.viewsAnalytics = action.payload;
      })
      .addCase(fetchRecentActivities.fulfilled, (state, action) => {
        state.activities = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
