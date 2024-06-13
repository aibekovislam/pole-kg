import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../utils/consts';

const initialState = {
    fields: [],
    field: null,
    availabelFieldDay: null
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

export const fetchAvailable = createAsyncThunk('field/available', async(id, { dispatch }) => {
    try {
        const response = await axios.get(`${API_URL}/field-availability-day/`);
        
    } catch (error) {
        console.log(error);
    }
})

export const { setFields } = fieldSlice.actions;
export default fieldSlice.reducer;