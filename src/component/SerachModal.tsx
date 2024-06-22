import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { SearchModalState, SearchResultState } from '../state/atom';
import { Dialog } from '@mui/material';
import { SearchResultType } from '../types';
import { SearchAPI } from '../apis/server';

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
  }, [SearchText]);

  return (
    <Dialog
      open={open}
      aria-labelledby='search'
      onClose={() => {
        setOpen(false);
      }}
      sx={{ width: '100vw', height: '100vh' }}
    >
      <div>
        <div>검색창</div>
        <div>{SearchText}</div>
        <div>검색결과</div>
      </div>
    </Dialog>
  );
};
export default SearchModal;
