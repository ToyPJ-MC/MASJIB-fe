import { useEffect } from 'react';
import { LoginAPI, RefreshTokenAPI } from '../apis/server';
import { setRefreshToken } from '../util/Cookie';
import React from 'react';

const KakaoLogin = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  setRefreshToken('refresh_token', code as string, 1);
  console.log(code);
  useEffect(() => {
    RefreshTokenAPI(code as string);
  }, []);
  return <></>;
};
export default KakaoLogin;
