import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosClient';

export const fetchTimeline = createAsyncThunk('timeline/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/timeline');
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to load timeline');
  }
});

const initialState = { items: [], status: 'idle', error: null };

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeline.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTimeline.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTimeline.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default timelineSlice.reducer;
