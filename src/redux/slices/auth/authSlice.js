import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../utils/consts';
import { storeData } from '../../../helpers/storeHelper';

const initialState = {
    user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload.user
    }
  },
});

export const signIn = createAsyncThunk('auth/loginUser', async (data = []) => {
    try {
        const { data: tokens } = await axios.post(`${API_URL}/users/jwt/create/`, data);
        storeData("tokens", JSON.stringify({ access: tokens.access, refresh: tokens.refresh }));
        const response = await axios.get(`${API_URL}/users/me/`, {
            headers: {
                Authorization: `Bearer ${tokens.access}`
            }
        })
        dispatch(authSlice.actions.setUser(response.data));
        storeData("userInfo", JSON.stringify({
            ...response.data,
        }));
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const signUp = createAsyncThunk('auth/registerUser', async (data = []) => {
    try {
        const { data: tokens } = await axios.post(`${API_URL}/users/`, data);
        console.log(tokens)
        storeData("tokens", JSON.stringify({ access: tokens.access, refresh: tokens.refresh }));
        const response = await axios.get(`${API_URL}/users/me/`, {
            headers: {
                Authorization: `Bearer ${tokens.access}`
            }
        })
        dispatch(authSlice.actions.setUser(response.data));
        storeData("userInfo", JSON.stringify({
            ...response.data,
        }));
        response.data
    } catch (error) {
        console.log(error);
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;