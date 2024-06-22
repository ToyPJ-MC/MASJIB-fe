import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { SearchModalState, SearchResultState } from '../state/atom';
import { Dialog, DialogActions } from '@mui/material';
import { SearchResultType } from '../types';
import { SearchAPI } from '../apis/server';
import { Button } from '@mui/material';

interface SearchModalProps {
  searchText: string;
}

const SearchModal = (props: SearchModalProps) => {
  const [open, setOpen] = useRecoilState<boolean>(SearchModalState);
  const { searchText } = props;
  const [SearchText, setSearchText] = useState<string>(searchText);
  const [searchResult, setSearchResult] =
    useRecoilState<SearchResultType>(SearchResultState);

  useEffect(() => {
    SearchAPI(SearchText, setSearchResult);
    setSearchText(searchText);
  }, []);

  return (
    <Dialog
      open={open}
      aria-labelledby='search'
      onClose={() => {
        setOpen(false);
      }}
      maxWidth='xl'
      fullWidth={true}
    >
      <div className='w-full h-screen'>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setSearchResult([]);
              setSearchText('');
            }}
            variant='contained'
          >
            X
          </Button>
        </DialogActions>
        <div className='grid grid-cols-2'>
          <div>
            <div>검색창</div>
            <div>{SearchText}</div>
            <div>검색결과</div>
            <div>
              {searchResult.map((result) => {
                return (
                  <div key={result.id}>
                    <div>{result.name}</div>
                    <div>{result.address}</div>
                    <div>{result.kind}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>지도</div>
        </div>
      </div>
    </Dialog>
  );
};
export default SearchModal;
