import { Button, Dialog } from '@mui/material';
import { useRecoilState } from 'recoil';
import { loginmodalState } from '../state/atom';
import React from 'react';
import kakaologo from '../assets/kakaologo.png';

const LoadingModal = () => {
  const [open, setOpen] = useRecoilState<boolean>(loginmodalState);
  const kakaoLogin = () => {
    location.href = 'http://34.64.33.188:18080/oauth2/authorization/kakao';
  };

  return (
    <Dialog
      open={open}
      aria-labelledby='login'
      onClose={() => {
        setOpen(false);
      }}
      sx={{ height: '50vh' }}
    >
      <div className='grid grid-rows-2 gap-2 w-32 h-32 place-items-center'>
        <Button
          onClick={kakaoLogin}
          style={{
            backgroundImage: `url(${kakaologo})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: '100px',
            height: '50px'
          }}
          size='large'
        />
        <div>구글</div>
      </div>
    </Dialog>
  );
};
export default LoadingModal;
