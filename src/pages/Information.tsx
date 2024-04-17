import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  Menu,
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
  RadiusMarkerAPIStatus,
  RadiusMarkerDataState,
  RadiusSortState,
  SortingRestaurantDataState,
  loginmodalState
} from '../state/atom';
import Reviewcard from '../component/Reviewcard';
import LoginModal from '../component/LoginModal';
import { SortingRestaurantType } from '../types';
import SortLoading from '../component/SortLoading';
import { getCookie } from '../util/Cookie';
import { useNavigate } from 'react-router-dom';
const Information = () => {
  const navigate = useNavigate();
  const categoriesChange = ['한식', '중식', '일식', '양식'];
  const [modal, setModal] = useRecoilState<boolean>(loginmodalState);
  const [sort, setSort] = useRecoilState<string>(RadiusSortState);
  const [sortby, setSortby] = useState<string>('Rating');
  const [review, setReview] = useRecoilState<SortingRestaurantType>(
    SortingRestaurantDataState
  );
  const markerAPI = useRecoilValue<boolean>(RadiusMarkerAPIStatus);
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
  // categories menu
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='h-screen w-screen overflow-hidden'>
      <div className='grid grid-cols-4 mt-4 items-center place-content-center border border-b-2 border-t-0 border-l-0 border-r-0'>
        <div className='font-bold text-4xl text-blue-500 mb-2 text-start ml-4'>
          MASJIB
        </div>
        <div className='col-span-2 grid grid-cols-3 mb-2 items-center'>
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
                width: '100%'
              }}
            />
          </div>
          <Button
            variant='outlined'
            sx={{
              width: 'fit-content',
              height: '100%'
            }}
          >
            <SearchIcon />
          </Button>
        </div>
        <div className='text-end mr-8'>
          {getCookie('access_token') ? (
            <div className='grid grid-cols-2'>
              <Button
                className='place-items-center'
                variant='outlined'
                sx={{
                  textAlign: 'center',
                  color: 'white',
                  height: '2.5rem',
                  backgroundColor: '#3B82F6',
                  borderColor: '#3B82F6',
                  fontFamily: 'bold',
                  fontSize: '1.0em',
                  ':hover': {
                    backgroundColor: '#3B82F6',
                    color: 'white'
                  }
                }}
              >
                Logout
              </Button>
              <Button
                onClick={() => {
                  navigate('/profile');
                }}
              >
                Profile
              </Button>
            </div>
          ) : (
            <Button
              className='place-items-center'
              variant='outlined'
              sx={{
                textAlign: 'center',
                color: 'white',
                height: '2.5rem',
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
          )}
        </div>
      </div>
      {modal ? <LoginModal /> : null}
      <div className='grid grid-cols-2 mt-2'>
        <div className='ml-4'>
          <div className='grid grid-cols-2'>
            <div
              className='text-xl font-bold w-fit'
              onMouseEnter={handleOpen}
              onMouseLeave={handleClose}
            >
              Categories
              {open ? (
                <div className='grid grid-cols-3'>
                  <MenuItem>한식</MenuItem>
                  <MenuItem>중식</MenuItem>
                  <MenuItem>일식</MenuItem>
                  <MenuItem>양식</MenuItem>
                </div>
              ) : null}
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
                <div className='text-base font-semibold'>
                  Sort by numbers Dibs
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
                <div className='text-base font-semibold'>
                  Sort by star rating
                </div>
                <Rating name='half-rating' defaultValue={0} precision={0.5} />
              </div>
            </div>
          </div>
          <div className='mt-2'>
            <div className='text-3xl font-bold'>
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
              {/* {markerAPI === false ? (
                <SortLoading />
              ) : markerAPI === true && review.length === 0 ? (
                <SortLoading />
              ) : (
                <>
                  {review.map((item, index) => {
                    if (item.recentReview === '등록된 리뷰가 없습니다.') {
                      return (
                        <div key={index}>
                          {item.name} 등록된 리뷰가 없습니다.
                        </div>
                      );
                    } else {
                      return (
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
                      );
                    }
                  })}
                </>
              )} */}
            </div>
          </div>
        </div>
        <div>{/* <Kakaomap /> */}</div>
      </div>
    </div>
  );
};
export default Information;
