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
      maxWidth='md'
      sx={{ height: '50vh' }}
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
              sx={{ marginBottom: '1em', borderRadius: '50px' }}
            />
          </DialogContent>
          <div className='ml-2 font-extralight sticky top-10'>
            Kakao API를 사용하는 서비스라 최대 45개밖에 <br></br>안 나오는 점
            양해부탁드립니다.
          </div>
          <div className='ml-2 text-slate-400 font-extralight sticky top-24'>
            Please understand that since this is a service that uses the Kakao
            API, there are only 45 items in total.
          </div>
        </div>
        <div>
          {searchResult.map((item, index) => {
            return (
              <div key={index} className='ml-2'>
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
