import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Kakaomap from '../component/Kakaomap';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  RadiusMarkerDataState,
  RadiusSortState,
  dumydataState,
  loginmodalState
} from '../state/atom';
import Reviewcard from '../component/Reviewcard';
import LoginModal from '../component/LoginModal';
import { RadiusMarkerType } from '../types';
import SortLoading from '../component/SortLoading';
const Information = () => {
  const categoriesChange = ['한식', '중식', '일식', '양식'];
  const [modal, setModal] = useRecoilState<boolean>(loginmodalState);
  const [sort, setSort] = useRecoilState<string>(RadiusSortState);
  const [sortby, setSortby] = useState<string>('Rating');
  const [review, setReview] = useRecoilState<RadiusMarkerType>(
    RadiusMarkerDataState
  );
  useEffect(() => {
    const handleScroll = () => {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    };
  }, [review]); // scroll hide시 passive true로 변경
  const imageURL = process.env.SERVER_URL + '/';

  const SortByhandleChange = (event: SelectChangeEvent) => {
    if (event.target.value === 'Rating') {
      setSortby(event.target.value as string);
      setSort('rating');
      setReview([]);
    } else if (event.target.value === 'Review') {
      setSortby(event.target.value as string);
      setSort('reviewCount');
      setReview([]);
    } else if (event.target.value === 'Dibs') {
      setSortby(event.target.value as string);
      setSort('FollowCount');
      setReview([]);
    }
  };
  return (
    <div className='h-screen w-screen overflow-hidden'>
      <div className='grid grid-cols-4 mt-8 items-center place-content-center border border-b-2 border-t-0 border-l-0 border-r-0'>
        <div className='font-bold text-4xl text-blue-500 text-center mb-2'>
          MASJIB
        </div>
        <div className='col-span-2 grid grid-cols-2 mb-2 items-center'>
          <div>
            <Autocomplete
              disablePortal
              id='category'
              options={categoriesChange}
              sx={{
                width: '100%'
              }}
              renderInput={(params) => (
                <TextField {...params} label='Categories' />
              )}
            />
          </div>
          <div>
            <TextField
              id='outlined-basic'
              label='Location'
              variant='outlined'
              sx={{
                width: '80%'
              }}
            />
            <Button variant='outlined' sx={{ height: '3.55em' }}>
              <SearchIcon />
            </Button>
          </div>
        </div>
        <div>
          <Button
            className='place-items-center'
            variant='outlined'
            sx={{
              textAlign: 'center',
              width: '25%',
              color: 'white',
              marginLeft: '30%',
              backgroundColor: '#3B82F6',
              borderColor: '#3B82F6',
              fontFamily: 'bold',
              fontSize: '1.0em',
              ':hover': {
                backgroundColor: '#3B82F6',
                color: 'white'
              }
            }}
            onClick={() => {
              setModal(true);
            }}
          >
            Log In
          </Button>
        </div>
      </div>
      {modal ? <LoginModal /> : null}
      <div className='grid grid-cols-2'>
        <div className='ml-4'>
          <div className='grid grid-cols-2'>
            <div>
              <div className='text-base font-semibold'>Categories</div>
              <ButtonGroup
                variant='outlined'
                aria-label='outlined button group'
                size='small'
                sx={{ borderColor: 'black' }}
              >
                <Button>Korean</Button>
                <Button>Chinese</Button>
              </ButtonGroup>
              <ButtonGroup
                variant='outlined'
                aria-label='outlined button group'
                size='small'
              >
                <Button>Japanese</Button>
                <Button>Western food</Button>
              </ButtonGroup>
            </div>
            <div className='grid grid-rows-3'>
              <div>
                <div className='text-base font-semibold'>
                  Sort by number of reviews
                </div>
                <ButtonGroup
                  variant='outlined'
                  aria-label='outlined button group'
                  size='small'
                >
                  <Button>10+</Button>
                  <Button>50+</Button>
                  <Button>100+</Button>
                </ButtonGroup>
              </div>
              <div>
                <div className='text-base font-semibold'>Favorite</div>
                <ButtonGroup
                  variant='outlined'
                  aria-label='outlined button group'
                  size='small'
                >
                  <Button>10+</Button>
                  <Button>50+</Button>
                  <Button>100+</Button>
                </ButtonGroup>
              </div>
              <div>
                <div className='text-base font-semibold'>
                  Sort by star rating
                </div>
                <Rating name='half-rating' defaultValue={2.5} precision={0.5} />
              </div>
            </div>
          </div>
          <div>
            <div className='text-2xl font-bold'>
              TOP 10 restaurants in current location
              <div className='grid place-items-end mr-4'>
                <FormControl>
                  <InputLabel id='sortby-select-label'>Sort By</InputLabel>
                  <Select
                    labelId='Sort By'
                    id='sort'
                    value={sortby}
                    label='Sort-By'
                    onChange={SortByhandleChange}
                  >
                    <MenuItem value={'Rating'}>Rating</MenuItem>
                    <MenuItem value={'Review'}>Review</MenuItem>
                    <MenuItem value={'Dibs'}>Dibs</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {review.length === 0 ? (
                <SortLoading />
              ) : (
                <div className='overflow-auto h-96 scrollbar-hide mt-2 mr-4'>
                  {review.map((item, index) => {
                    return (
                      <Reviewcard
                        key={index}
                        review={item.recentReview}
                        rating={item.totalRating}
                        imageUrl={imageURL + item.image}
                        restaurantname={item.name}
                        address={item.address}
                        category={item.kind}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <Kakaomap />
        </div>
      </div>
    </div>
  );
};
export default Information;
