import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosClient';
import toast from 'react-hot-toast';

/**
 * Creates a standard CRUD Redux slice (fetchAll, create, update, remove, reorder)
 * for a given REST resource. Use for simple modules without file uploads.
 *
 * @param {string} name - slice name, also used as the API endpoint (e.g. 'skills')
 * @param {string} label - human label for toast messages (e.g. 'Skill')
 */
export function createCrudSlice(name, label) {
  const fetchAll = createAsyncThunk(`${name}/fetchAll`, async (params, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/${name}`, { params });
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || `Failed to load ${label.toLowerCase()}s`);
    }
  });

  const create = createAsyncThunk(`${name}/create`, async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/${name}`, payload);
      toast.success(`${label} added`);
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.error || `Failed to add ${label.toLowerCase()}`;
      toast.error(msg);
      return rejectWithValue(msg);
    }
  });

  const update = createAsyncThunk(`${name}/update`, async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/${name}/${id}`, payload);
      toast.success(`${label} updated`);
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.error || `Failed to update ${label.toLowerCase()}`;
      toast.error(msg);
      return rejectWithValue(msg);
    }
  });

  const remove = createAsyncThunk(`${name}/delete`, async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/${name}/${id}`);
      toast.success(`${label} deleted`);
      return id;
    } catch (err) {
      const msg = err.response?.data?.error || `Failed to delete ${label.toLowerCase()}`;
      toast.error(msg);
      return rejectWithValue(msg);
    }
  });

  const reorder = createAsyncThunk(`${name}/reorder`, async (order, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/${name}/reorder`, { order });
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.error || `Failed to reorder ${label.toLowerCase()}s`;
      toast.error(msg);
      return rejectWithValue(msg);
    }
  });

  const initialState = {
    items: [],
    status: 'idle',
    error: null,
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      reorderLocally(state, action) {
        state.items = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAll.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAll.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.items = action.payload;
        })
        .addCase(fetchAll.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(create.fulfilled, (state, action) => {
          state.items.push(action.payload);
        })
        .addCase(update.fulfilled, (state, action) => {
          const idx = state.items.findIndex((i) => i._id === action.payload._id);
          if (idx !== -1) state.items[idx] = action.payload;
        })
        .addCase(remove.fulfilled, (state, action) => {
          state.items = state.items.filter((i) => i._id !== action.payload);
        })
        .addCase(reorder.fulfilled, (state, action) => {
          state.items = action.payload;
        });
    },
  });

  return {
    reducer: slice.reducer,
    actions: { ...slice.actions, fetchAll, create, update, remove, reorder },
  };
}
