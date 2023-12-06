import axios from 'axios';
import { API_URL } from '../Constants/Constants';
import { getCookie, setAccessToken } from '../util/Cookie';

const jinInterceptor = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});
const access_token = getCookie('access_token');
const refresh_token = getCookie('refresh_token');

const headerConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

jinInterceptor.interceptors.request.use(
  (config) => {
    const token = access_token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
jinInterceptor.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 && !originalRequest._retry) ||
      (error.response.status === 403 && !originalRequest._retry)
    ) {
      originalRequest._retry = true;
      const refreshToken = refresh_token;
      return axios
        .post(`${API_URL}/oauth/login`, refreshToken, {
          headers: { 'Content-Type': 'text/plain' }
        })
        .then((res) => {
          if (res.status === 200) {
            //setAccessToken('access_token', res.data.accessToken);
            console.log('Access token refreshed!');
            return jinInterceptor(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default jinInterceptor;
