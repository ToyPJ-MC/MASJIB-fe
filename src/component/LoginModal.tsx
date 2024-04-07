import { Dialog } from '@mui/material';
import { useRecoilState } from 'recoil';
import { loginmodalState } from '../state/atom';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const LoadingModal = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useRecoilState<boolean>(loginmodalState);
  const kakaoLogin = () => {
    location.href = 'http://34.64.33.188:18080/oauth2/authorization/kakao';
    //window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${'	ec9eeca1e981e1b73b756c7f14f1935f'}&redirect_uri=${'http://localhost:3000/login/oauth2/'}&response_type=code`;
  };

  return (
    <Dialog
      open={open}
      aria-labelledby='alert-dialog-title'
      onClose={() => {
        setOpen(false);
      }}
      maxWidth='md'
      sx={{ height: '50vh' }}
    >
      <div className='grid grid-cols-2 gap-2'>
        <div onClick={kakaoLogin}>카카오</div>
        <div>구글</div>
      </div>
    </Dialog>
  );
};
export default LoadingModal;
