import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosClient';
import toast from 'react-hot-toast';

export const submitContactForm = createAsyncThunk(
  'contact/submit',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/contact', payload);
      toast.success("Message sent! I'll get back to you soon.");
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to send message';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const fetchContacts = createAsyncThunk('contact/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/contact');
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to load messages');
  }
});

export const markContactRead = createAsyncThunk(
  'contact/markRead',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/contact/${id}/read`);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to update message');
    }
  }
);

export const deleteContactMessage = createAsyncThunk(
  'contact/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/contact/${id}`);
      toast.success('Message deleted');
      return id;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to delete message';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

const initialState = {
  items: [],
  status: 'idle',
  submitStatus: 'idle',
  error: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.submitStatus = 'loading';
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.submitStatus = 'succeeded';
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.submitStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(markContactRead.fulfilled, (state, action) => {
        const idx = state.items.findIndex((i) => i._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteContactMessage.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i._id !== action.payload);
      });
  },
});

export default contactSlice.reducer;
