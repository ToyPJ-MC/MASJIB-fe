import { useEffect } from 'react';
import { RefreshTokenAPI } from '../apis/server';
import React from 'react';

const KakaoLogin = () => {
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    RefreshTokenAPI(code as string);
  }, []);
  return <></>;
};
export default KakaoLogin;
