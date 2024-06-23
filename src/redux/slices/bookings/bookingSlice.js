import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../utils/consts';

const initialState = {
    bookings: [],
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialState,
  reducers: {
    setBooking: (state, action) => {
        state.bookings = action.payload.bookings
    }
  },
});


export const toRent = createAsyncThunk('booking/post', async (data = [], token = '', { dispatch }) => {
    try {
        const response = await axios.post(`${API_URL}/bookings`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
})


export const { setBooking } = bookingSlice.actions;
export default bookingSlice.reducer;