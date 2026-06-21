import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosClient';
import toast from 'react-hot-toast';

export const fetchAchievements = createAsyncThunk(
  'achievements/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/achievements');
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to load achievements');
    }
  }
);

export const createAchievement = createAsyncThunk(
  'achievements/create',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/achievements', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Achievement added');
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to add achievement';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const updateAchievement = createAsyncThunk(
  'achievements/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/achievements/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Achievement updated');
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to update achievement';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const deleteAchievement = createAsyncThunk(
  'achievements/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/achievements/${id}`);
      toast.success('Achievement deleted');
      return id;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to delete achievement';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

const initialState = { items: [], status: 'idle', error: null };

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAchievements.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAchievements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAchievements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createAchievement.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateAchievement.fulfilled, (state, action) => {
        const idx = state.items.findIndex((i) => i._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteAchievement.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i._id !== action.payload);
      });
  },
});

export default achievementsSlice.reducer;
