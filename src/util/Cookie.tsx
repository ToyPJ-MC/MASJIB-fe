import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getCookie = (name: string) => {
  return cookies.get(name);
};

// export const setRefreshToken = (value: string, refreshexpires: number) => {
//   const date = new Date(Date.now() + refreshexpires);
//   const UTCDate = new Date(
//     date.getTime() + date.getTimezoneOffset() * 60 * 1000
//   );
//   cookies.set('refresh_token', value, {
//     path: '/',
//     expires: UTCDate
//   });
// };
// export const setAccessToken = (value: string, accessexpires: number) => {
//   const date = new Date(Date.now() + accessexpires);
//   const UTCDate = new Date(
//     date.getTime() + date.getTimezoneOffset() * 60 * 1000
//   );
//   cookies.set('access_token', value, {
//     path: '/',
//     expires: UTCDate
//   });
// };

export const setCookie = (name: string, value: string, option?: any) => {
  cookies.set(name, value, {
    path: '/',
    ...option
  });
};

export const removeCookie = (name: string, option?: any) => {
  cookies.remove(name, option);
};
