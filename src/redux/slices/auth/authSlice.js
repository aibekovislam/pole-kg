import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../utils/consts';
import { storeData } from '../../../helpers/storeHelper';

const initialState = {
    user: null,
    isAuthendticated: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload
    },
    setIsAuthendticated: (state, action) => {
        state.isAuthendticated = action.payload
    }
  },
});

export const signIn = createAsyncThunk('auth/loginUser', async (login_data) => {
    try {
        const data = {
            phone_number: login_data.phone_number
        }
        const response = await axios.post(`${API_URL}/users/login/`, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const signUp = createAsyncThunk('auth/registerUser', async ({ name, number }, { rejectWithValue }) => {
    try {
        const data = {
            phone_number: number,
            name: name
        }
        const response = await axios.post(`${API_URL}/users/register/`, data);
        return response.data;
    } catch (error) {
        console.log(error)
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const verifyUser = createAsyncThunk('auth/verify', async({ pin, number }, { dispatch, rejectWithValue }) => {
    try {
        const postData = {
            phone_number: number,
            code: pin
        }
        const { data: tokens } = await axios.post(`${API_URL}/users/pin/verify/`, postData);
        console.log(tokens)
        storeData("token", JSON.stringify({ access: tokens.access }));
        const response = await axios.get(`${API_URL}/users/me/`, {
            headers: {
                Authorization: `Bearer ${tokens.access}`
            }
        })
        console.log('user: ', response.data)
        dispatch(authSlice.actions.setUser(response.data));
        dispatch(authSlice.actions.setIsAuthendticated(true))
        storeData("userInfo", JSON.stringify(response.data));
    } catch (error) {
        console.log('this error', error)
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;