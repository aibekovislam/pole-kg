import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://167.71.55.32',
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const parsedToken = JSON.parse(token);
        config.headers.Authorization = `Bearer ${parsedToken.access}`;
      }
    } catch (error) {
      console.log('Error fetching token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log('API response error:', error);
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('token');
        const parsedToken = JSON.parse(refreshToken);
        console.log(parsedToken)
        const response = await axios.post('http://167.71.55.32/users/jwt/refresh/', {
          refresh: parsedToken.refresh,
        });

        const newAccessToken = response.data;
        await AsyncStorage.setItem('token', JSON.stringify(newAccessToken));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log('Refresh token failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;