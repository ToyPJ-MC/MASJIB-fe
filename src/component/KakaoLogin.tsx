import { useEffect } from 'react';
import { LoginAPI, RefreshTokenAPI } from '../apis/server';
import { setCookie } from '../util/Cookie';

const KakaoLogin = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  setCookie('refresh_token', code as string, { path: '/' });
  console.log(code);
  useEffect(() => {
    RefreshTokenAPI(code as string);
  }, []);
  return <></>;
};
export default KakaoLogin;
