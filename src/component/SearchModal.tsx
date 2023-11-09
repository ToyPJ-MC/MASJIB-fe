import { Dialog, TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import { modalState, searchState } from '../state/atom';
import { useState } from 'react';

const SearchModal = () => {
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [input, setInput] = useState<string>('');
  const [search, setSearch] = useRecoilState<string>(searchState);
  const handleClose = () => {
    setModal(false);
  };
  return (
    <Dialog open={modal} onClose={handleClose}>
      <div>
        <div>검색할 음식점</div>
        <TextField
          id='Restuarant-basic'
          label='Restuarant'
          variant='standard'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              setSearch(input);
              setModal(false);
            }
          }}
        />
      </div>
    </Dialog>
  );
};
export default SearchModal;
