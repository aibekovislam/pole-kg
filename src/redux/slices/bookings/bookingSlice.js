import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../utils/consts';
import api from '../../../utils/axios';

const initialState = {
    bookings: [],
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialState,
  reducers: {
    setBookings: (state, action) => {
        state.bookings = action.payload.bookings
    }
  },
});


export const fetchBookings = createAsyncThunk('bookings/get', async (_, { dispatch }) => {
    try {
        const response = await api.get(`/bookings/`);
        dispatch(bookingSlice.actions.setBookings({ bookings: response.data.results }))
    } catch (error) {
        console.log('Booking get error: ', error);
    }
})

export const toRent = createAsyncThunk('booking/post', async ({ start_time, end_time, field }, { dispatch }) => {
    try {
        const data = {
            start_time: start_time,
            end_time: end_time,
            field: field
        }
        const response = await api.post(`/bookings/`, data);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
})


export const { setBooking } = bookingSlice.actions;
export default bookingSlice.reducer;