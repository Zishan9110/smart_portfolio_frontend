import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosClient';
import toast from 'react-hot-toast';

export const fetchProfile = createAsyncThunk('profile/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/profile');
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to load profile');
  }
});

export const updateProfile = createAsyncThunk('profile/update', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.put('/profile', payload);
    toast.success('Profile updated');
    return data.data;
  } catch (err) {
    const msg = err.response?.data?.error || 'Failed to update profile';
    toast.error(msg);
    return rejectWithValue(msg);
  }
});

export const uploadProfilePhoto = createAsyncThunk(
  'profile/uploadPhoto',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('photo', file);
      const { data } = await api.put('/profile/photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Profile photo updated');
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to upload photo';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const uploadCoverBanner = createAsyncThunk(
  'profile/uploadBanner',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('banner', file);
      const { data } = await api.put('/profile/banner', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Cover banner updated');
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to upload banner';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const uploadResume = createAsyncThunk(
  'profile/uploadResume',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const { data } = await api.put('/profile/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Resume updated');
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to upload resume';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const incrementPortfolioView = createAsyncThunk('profile/incrementView', async () => {
  try {
    await api.post('/profile/view');
  } catch {
    // non-critical, fail silently
  }
});

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addMatcher(
        (action) =>
          [updateProfile.fulfilled, uploadProfilePhoto.fulfilled, uploadCoverBanner.fulfilled, uploadResume.fulfilled].some(
            (a) => a.type === action.type
          ),
        (state, action) => {
          state.data = action.payload;
        }
      );
  },
});

export default profileSlice.reducer;
