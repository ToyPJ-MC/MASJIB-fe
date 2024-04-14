import { Dialog, DialogContent, Divider, TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import {
  m_SearchModalState,
  searchResultState,
  searchState
} from '../state/atom';
import { useState } from 'react';
import React from 'react';

const M_SearchModal = () => {
  const [modal, setModal] = useRecoilState<boolean>(m_SearchModalState);
  const [input, setInput] = useState<string>('');
  const [search, setSearch] = useRecoilState<string>(searchState);
  const [searchResult, setSearchResult] = useRecoilState(searchResultState);
  const handleClose = () => {
    setModal(false);
  };
  return (
    <Dialog open={modal} onClose={handleClose}>
      <div className='grid grid-rows-2 h-80'>
        <div className='border border-l-0 border-t-0 border-b-0'>
          <div className='grid place-items-center text-xl mt-1 font-bold'>
            등록할 음식점
          </div>
          <DialogContent>
            <TextField
              id='Restuarant'
              label='Restuarant'
              variant='standard'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  setSearch(input);
                }
              }}
              sx={{ marginBottom: '1em', borderRadius: '50px' }}
            />
          </DialogContent>
        </div>
        {searchResult.length === 0 ? (
          <div className='grid place-items-center mt-4'>
            검색결과가 없습니다.
          </div>
        ) : (
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
        )}
      </div>
    </Dialog>
  );
};
export default M_SearchModal;
