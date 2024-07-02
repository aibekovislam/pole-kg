import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../utils/consts';
import api from '../../../utils/axios';

const initialState = {
    fields: [],
    field: null,
    field_by_hour: null,
    availabelFieldMonth: {},
    availabelFieldDay: [],
    fieldsForFilter: [],
    savedFields: [],
    searchFields: []
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
    setFieldByHour: (state, action) => {
        state.field_by_hour = action.payload.field_by_hour
    },
    setAvailabelFieldMonth: (state, action) => {
        state.availabelFieldMonth = action.payload.availabelFieldMonth
    },
    setAvailabelFieldDay: (state, action) => {
        state.availabelFieldDay = action.payload.availabelFieldDay
    },
    setFieldsForFilter: (state, action) => {
        state.fieldsForFilter = action.payload.fieldsForFilter
    },
    setSaveField: (state, action) => {
        state.savedFields = action.payload.savedFields
    },
    setSearchedFields: (state, action) => {
        state.searchFields = action.payload.searchFields
    }
  },
});

export const fetchFields = createAsyncThunk('fields', async (filters = {}, { dispatch }) => {
    try {
        let response;
        const filtersParams = {};

        if (filters.length !== undefined) {
            filtersParams.max_length = +filters.length;
            filtersParams.min_length = +filters.length;
        }
        if (filters.width !== undefined) {
            filtersParams.max_width = +filters.width;
            filtersParams.min_width = +filters.width;
        }
        if (filters.fromTime !== undefined) {
            filtersParams.schedule_start = filters.fromTime;
        }
        if (filters.toTime !== undefined) {
            filtersParams.schedule_end = filters.toTime;
        }

        if (Object.keys(filtersParams).length === 0) {
            response = await api.get(`${API_URL}/fields/`);
        } else {
            response = await api.get(`${API_URL}/fields/`, { params: filtersParams });
        }

        dispatch(fieldSlice.actions.setFields({ fields: response.data.results }));
    } catch (error) {
        console.log(error);
    }
});


export const fetchField = createAsyncThunk('field', async(id = 0, { dispatch }) => {
    try {
        const response = await api.get(`${API_URL}/fields/${id}/`);
        dispatch(fieldSlice.actions.setField({ field: response.data }))
    } catch (error) {
        console.log(error);
    }
})

export const fetchFieldByHour = createAsyncThunk('field/fetchByHour', async({ id, hour, minutes = 0 }, { dispatch }) => {
    try {
        const response = await axios.get(`${API_URL}/fields/${id}/?hours=${hour}&${minutes}/`);
        console.log(response.data)
        dispatch(fieldSlice.actions.setFieldByHour({ field_by_hour: response.data }));
    } catch (error) {
        console.log(error);
    }
});

export const fetchAvailable = createAsyncThunk('field/available', async(data = {}, { dispatch }) => {
    try {
        const response = await axios.get(`${API_URL}/field-availability-month/?field_id=${data.field_id}&month=${data.month}&year=${data.year}`);        
        dispatch(fieldSlice.actions.setAvailabelFieldMonth({ availabelFieldMonth: response.data }))
    } catch (error) {
        console.log(error);
    }
})

export const fetchAvailableDay = createAsyncThunk('field/available', async(data = {}, { dispatch }) => {
    try {
        const response = await axios.get(`${API_URL}/field-availability-day/?field_id=${data.field_id}&date=${data.date}`);        
        dispatch(fieldSlice.actions.setAvailabelFieldDay({ availabelFieldDay: response.data }));
    } catch (error) {
        console.log(error);
    }
})

export const postReview = createAsyncThunk('field/review', async(data, { dispatch }) => {
    try {
        const response = await axios.post(`${API_URL}/reviews/create/`, data);
        console.log(response);
        dispatch(fetchField(data.field));
    } catch (error) {
        console.log(error);
    }
})

export const fetchFilterFields = createAsyncThunk('field/filter', async(_, { dispatch }) => {
    try {
        const response = await axios.get(`${API_URL}/fields/`);
        dispatch(fieldSlice.actions.setFieldsForFilter({ fieldsForFilter: response.data.results }))
    } catch (error) {
        console.log(error);
    }
})

export const fetchSavedFields = createAsyncThunk('field/fetchsaved', async (_, { dispatch }) => {
    try {
        const response = await api.get(`${API_URL}/favorites/`);
        dispatch(fieldSlice.actions.setSaveField({ savedFields: response.data.results }));
    } catch (error) {
        console.log('Fetch saved fields error:', error);
        throw error;
    }
});

export const saveToFavorite = createAsyncThunk(
    'field/save',
    async (field_id, { dispatch, rejectWithValue }) => {
      try {
        const response = await api.post(`/favorites/`, { field: field_id });
        console.log(response.data);
        dispatch(fetchFields());
        return response.data;
      } catch (error) {
        
        console.log('Favorite error: ', error);
  
        if (!error.response) {
          return rejectWithValue('Network error: ' + error.message);
        }
  
        if (error.response.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
);  

export const reviewPost = createAsyncThunk('field/reviewPost', async ({field, rating, comment}, { dispatch }) => {
    try {
        const data = {
            user: {
                email: "user@example.com",
                name: "string"
            },
            rating: rating,
            comment: comment,
            field: field
        }
        const response = await api.post('/reviews/create/', data);
        console.log(response.data);
        dispatch(fetchField(field))
    } catch (error) {
        console.log('Review post error: ', error);
        throw error;
    }
})


export const fetchSearchFields = createAsyncThunk('field/search', async ({search_filters}, { dispatch }) => {
    try {
        const response = await axios.get(`${API_URL}/fields/`, { 
            params: {
                search: search_filters
            }
         })
         dispatch(fieldSlice.actions.setSearchedFields({ searchFields: response.data.results }));
    } catch (error) {
        console.log(error)
    }
})

export const { setFields } = fieldSlice.actions;
export default fieldSlice.reducer;