import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../utils/consts';
import { clearAsyncStorage, storeData } from '../../../helpers/storeHelper';
import api from '../../../utils/axios';

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
        storeData("token", JSON.stringify({ access: tokens.access, refresh: tokens.refresh }));
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

export const deleteUser = createAsyncThunk('auth/delete', async (_, { dispatch }) => {
    try {
        const response = await api.delete('/users/me/');
        console.log(response.data);
        dispatch(authSlice.actions.setUser(null));
        clearAsyncStorage();
    } catch (error) {
        console.log(error);
    }
})

export const patchUser = createAsyncThunk('user/patch', async ({ name, phone_number, avatar }, { dispatch }) => {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone_number', phone_number);
        if (avatar) {
            formData.append('avatar', {
                uri: avatar,
                name: 'avatar.jpg',
                type: 'image/jpeg',
            });
        }

        console.log(formData);

        const response = await api.patch('/users/update_me/', formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
            }
        });

        console.log('patch successfull: ', response.data);

        const userResponse = await api.get('/users/me/');
        console.log('user: ', userResponse.data);
        
        dispatch(authSlice.actions.setUser(userResponse.data));
        storeData('userInfo', JSON.stringify(userResponse.data));
    } catch (error) {
        console.log('API response error:', error);
        if (error.response && error.response.data) {
            console.log('API response data:', error.response.data);
        }
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;