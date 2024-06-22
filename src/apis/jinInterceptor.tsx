import axios from 'axios';
import { API_URL } from '../Constants/Constants';
import { getCookie, removeCookie, setCookie } from '../util/Cookie';

const jinInterceptor = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    withCredentials: 'true'
  }
});
const access_token = getCookie('access_token');
const refresh_token = getCookie('refresh_token');

const headerConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Allow-Control-Allow-Credentials': true
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
      removeCookie('access_token');
      originalRequest._retry = true;
      const refreshToken = refresh_token;
      return axios
        .get(`${API_URL}/oauth/refresh`, {
          params: {
            refreshToken: refreshToken
          },
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Allow-Control-Allow-Credentials': true
          }
        })
        .then((res) => {
          if (res.status === 200) {
            const accessTokenExpiration = new Date(
              Date.now() + res.data.accessTokenExpiresIn * 10
            );
            const refreshTokenExpiration = new Date(
              Date.now() + res.data.refreshTokenExpiresIn * 6
            );
            setCookie('access_token', res.data.accessToken, {
              expires: accessTokenExpiration
            });
            setCookie('refresh_token', res.data.refreshToken, {
              expires: refreshTokenExpiration
            });
            //console.log('Access token refreshed!');
            return jinInterceptor(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default jinInterceptor;
