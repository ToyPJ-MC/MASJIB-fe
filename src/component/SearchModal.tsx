import { Dialog } from '@mui/material';
import { useRecoilState } from 'recoil';
import { modalState } from '../state/atom';

const SearchModal = () => {
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const handleClose = () => {
    setModal(false);
  };
  return (
    <Dialog open={modal} onClose={handleClose}>
      <div>hi</div>
    </Dialog>
  );
};
export default SearchModal;
