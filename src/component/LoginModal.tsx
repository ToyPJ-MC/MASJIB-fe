import { Dialog } from '@mui/material';
import { useRecoilState } from 'recoil';
import { loginmodalState } from '../state/atom';

const LoadingModal = () => {
  const [open, setOpen] = useRecoilState<boolean>(loginmodalState);
  const kakaoLogin = () => {
    location.href = 'http://192.168.0.16:18080/oauth2/authorization/kakao';
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
