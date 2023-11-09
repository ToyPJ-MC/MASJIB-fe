import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField
} from '@mui/material';
import { useRecoilState } from 'recoil';
import { modalState, searchResultState, searchState } from '../state/atom';
import { useState } from 'react';

const SearchModal = () => {
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [input, setInput] = useState<string>('');
  const [search, setSearch] = useRecoilState<string>(searchState);
  const [searchResult, setSearchResult] = useRecoilState(searchResultState);
  const handleClose = () => {
    setModal(false);
  };
  return (
    <Dialog
      open={modal}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      fullWidth={true}
    >
      <div className='grid grid-cols-2'>
        <div className='border border-l-0 border-t-0 border-b-0'>
          <DialogTitle id='alert-dialog-title'>{'등록할 음식점'}</DialogTitle>
          <DialogContent>
            <TextField
              id='Restuarant-basic'
              label='Restuarant'
              variant='standard'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  setSearch(input);
                  setSearchResult([]);
                }
              }}
              sx={{ marginBottom: '1em' }}
            />
          </DialogContent>
        </div>
        <div>
          {searchResult.map((item, index) => {
            return (
              <div key={index}>
                <div>{item.place_name}</div>
                <div>{item.road_address_name}</div>
                <div>{item.phone}</div>
                <Divider />
              </div>
            );
          })}
        </div>
      </div>
    </Dialog>
  );
};
export default SearchModal;
