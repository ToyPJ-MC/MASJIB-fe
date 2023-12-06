import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const setRefreshToken = (
  name: string,
  value: string,
  refreshexpires: number
) => {
  cookies.set(name, value, {
    path: '/',
    expires: new Date(Date.now() + refreshexpires)
  });
};
export const setAccessToken = (
  name: string,
  value: string,
  accessexpires: number
) => {
  cookies.set(name, value, {
    path: '/',
    expires: new Date(Date.now() + accessexpires)
  });
};

export const removeCookie = (name: string, option?: any) => {
  cookies.remove(name, option);
};
