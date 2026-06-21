import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosClient';
import toast from 'react-hot-toast';

export const fetchCertifications = createAsyncThunk(
  'certifications/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/certifications');
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to load certifications');
    }
  }
);

export const createCertification = createAsyncThunk(
  'certifications/create',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/certifications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Certification added');
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to add certification';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const updateCertification = createAsyncThunk(
  'certifications/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/certifications/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Certification updated');
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to update certification';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const deleteCertification = createAsyncThunk(
  'certifications/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/certifications/${id}`);
      toast.success('Certification deleted');
      return id;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to delete certification';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

const initialState = { items: [], status: 'idle', error: null };

const certificationsSlice = createSlice({
  name: 'certifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCertifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCertifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createCertification.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCertification.fulfilled, (state, action) => {
        const idx = state.items.findIndex((i) => i._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteCertification.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i._id !== action.payload);
      });
  },
});

export default certificationsSlice.reducer;
