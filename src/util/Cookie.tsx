import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const setRefreshToken = (name: string, value: string) => {
  cookies.set(name, value, {
    path: '/',
    expires: new Date(Date.now() + 60 * 60 * 1000)
  });
};
export const setAccessToken = (name: string, value: string) => {
  cookies.set(name, value, {
    path: '/',
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 60 * 60 * 1000)
  });
};

export const removeCookie = (name: string, option?: any) => {
  cookies.remove(name, option);
};
