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
  const date = new Date(Date.now() + refreshexpires);
  const UTCDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000
  );
  cookies.set(name, value, {
    path: '/',
    expires: UTCDate
  });
};
export const setAccessToken = (
  name: string,
  value: string,
  accessexpires: number
) => {
  const date = new Date(Date.now() + accessexpires);
  const UTCDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000
  );
  cookies.set(name, value, {
    path: '/',
    expires: UTCDate
  });
};

export const removeCookie = (name: string, option?: any) => {
  cookies.remove(name, option);
};
