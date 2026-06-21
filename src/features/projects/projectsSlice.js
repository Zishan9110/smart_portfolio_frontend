import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosClient';
import toast from 'react-hot-toast';

export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/projects', { params });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to load projects');
    }
  }
);

export const fetchProject = createAsyncThunk(
  'projects/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/projects/${id}`);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Project not found');
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/create',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Project created');
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to create project';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/projects/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Project updated');
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to update project';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted');
      return id;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to delete project';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const deleteProjectImage = createAsyncThunk(
  'projects/deleteImage',
  async ({ projectId, imageId }, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/projects/${projectId}/images/${imageId}`);
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to delete image';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const reorderProjects = createAsyncThunk(
  'projects/reorder',
  async (order, { rejectWithValue }) => {
    try {
      const { data } = await api.put('/projects/reorder', { order });
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to reorder projects';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

const initialState = {
  items: [],
  current: null,
  total: 0,
  page: 1,
  pages: 1,
  status: 'idle',
  error: null,
  filters: {
    search: '',
    category: '',
    featured: undefined,
    sortBy: 'displayOrder',
    order: 'asc',
  },
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
    clearCurrentProject(state) {
      state.current = null;
    },
    reorderLocally(state, action) {
      // optimistic local reorder for smooth drag & drop UX
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.total += 1;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
        if (state.current?._id === action.payload._id) state.current = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteProjectImage.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
        if (state.current?._id === action.payload._id) state.current = action.payload;
      })
      .addCase(reorderProjects.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { setFilters, resetFilters, clearCurrentProject, reorderLocally } = projectsSlice.actions;
export default projectsSlice.reducer;
