import { useEffect } from 'react';
import { LoginAPI, RefreshTokenAPI } from '../apis/server';
import { setRefreshToken } from '../util/Cookie';

const KakaoLogin = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);
  setRefreshToken('refresh_token', code as string);
  useEffect(() => {
    RefreshTokenAPI(code as string);
  }, []);
  return <></>;
};
export default KakaoLogin;
