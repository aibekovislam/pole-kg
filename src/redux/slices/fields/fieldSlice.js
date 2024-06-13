import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../utils/consts';

const initialState = {
    fields: [],
    field: null,
    availabelFieldMonth: {},
    availabelFieldDay: []
}

const fieldSlice = createSlice({
  name: 'field',
  initialState: initialState,
  reducers: {
    setFields: (state, action) => {
        state.fields = action.payload.fields
    },
    setField: (state, action) => {
        state.field = action.payload.field
    },
    setAvailabelFieldMonth: (state, action) => {
        state.availabelFieldMonth = action.payload.availabelFieldMonth
    },
    setAvailabelFieldDay: (state, action) => {
        state.availabelFieldDay = action.payload.availabelFieldDay
    }
  },
});

export const fetchFields = createAsyncThunk('fields', async (_, { dispatch }) => {
    try {
        const response = await axios.get(`${API_URL}/fields/`);
        dispatch(fieldSlice.actions.setFields({ fields: response.data.results }));
    } catch (error) {
        console.log(error);
    }
})


export const fetchField = createAsyncThunk('field', async(id, { dispatch }) => {
    try {
        const response = await axios.get(`${API_URL}/fields/${id}/`);
        dispatch(fieldSlice.actions.setField({ field: response.data }))
    } catch (error) {
        console.log(error);
    }
})

export const fetchAvailable = createAsyncThunk('field/available', async(data, { dispatch }) => {
    try {
        const response = await axios.get(`${API_URL}/field-availability-month/?field_id=${data.field_id}&month=${data.month}&year=${data.year}`);        
        dispatch(fieldSlice.actions.setAvailabelFieldMonth({ availabelFieldMonth: response.data }))
    } catch (error) {
        console.log(error);
    }
})

export const fetchAvailableDay = createAsyncThunk('field/available', async(data, { dispatch }) => {
    try {
        const response = await axios.get(`${API_URL}/field-availability-day/?field_id=${data.field_id}&date=${data.date}`);        
        dispatch(fieldSlice.actions.setAvailabelFieldDay({ availabelFieldDay: response.data }));
    } catch (error) {
        console.log(error);
    }
})

export const { setFields } = fieldSlice.actions;
export default fieldSlice.reducer;