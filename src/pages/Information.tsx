import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Kakaomap from '../component/Kakaomap';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  RadiusMarkerAPIStatus,
  RadiusMarkerDataState,
  RadiusSortState,
  SortingRestaurantDataState,
  loginmodalState,
  logoutstate,
  serverstatus
} from '../state/atom';
import Reviewcard from '../component/Reviewcard';
import LoginModal from '../component/LoginModal';
import { SortingRestaurantType } from '../types';
import SortLoading from '../component/SortLoading';
import { getCookie } from '../util/Cookie';
import { useNavigate } from 'react-router-dom';
import { LogoutAPI, ServerStatusAPI } from '../apis/server';
import toast from 'react-hot-toast';

interface CustomMarkProps {
  value: string;
}

const Information = () => {
  const navigate = useNavigate();
  const categoriesChange = ['한식', '중식', '일식', '양식'];
  const [modal, setModal] = useRecoilState<boolean>(loginmodalState);
  const [sort, setSort] = useRecoilState<string>(RadiusSortState);
  const [sortby, setSortby] = useState<string>('Rating');
  const [review, setReview] = useRecoilState<SortingRestaurantType>(
    SortingRestaurantDataState
  );
  const [logout, setLogout] = useRecoilState<boolean>(logoutstate);
  const markerAPI = useRecoilValue<boolean>(RadiusMarkerAPIStatus);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     window.addEventListener('scroll', handleScroll, { passive: true });
  //     return () => {
  //       window.removeEventListener('scroll', handleScroll);
  //     };
  //   };
  // }, [review]); // scroll hide시 passive true로 변경

  const imageURL = process.env.SERVER_URL + '/';

  const SortByhandleChange = (event: SelectChangeEvent) => {
    if (event.target.value === 'Rating') {
      setSortby(event.target.value as string);
      setSort('rating');
      setReview([]);
    } else if (event.target.value === 'Review') {
      setSortby(event.target.value as string);
      setSort('review');
      setReview([]);
    } else if (event.target.value === 'Dibs') {
      setSortby(event.target.value as string);
      setSort('follow');
      setReview([]);
    }
  };
  // #region restaurants menu
  const [resopen, resSetOpen] = useState<boolean>(false);
  const reshandleOpen = () => {
    resSetOpen(true);
  };
  const reshandleClose = () => {
    resSetOpen(false);
  };
  // #endregion
  // #region sort by number of reviews
  const [reviewopen, reviewSetOpen] = useState<boolean>(false);
  const CustomReviewMark: React.FC<CustomMarkProps> = ({ value }) => {
    return <Typography style={{ fontSize: '0.7rem' }}>{value}</Typography>;
  };
  const reviewhandleOpen = () => {
    reviewSetOpen(true);
  };
  const reviewhandleClose = () => {
    reviewSetOpen(false);
  };

  const reviewmarks = [
    {
      value: 0,
      label: <CustomReviewMark value='0' />
    },
    {
      value: 10,
      label: <CustomReviewMark value='10+' />
    },
    {
      value: 50,
      label: <CustomReviewMark value='50+' />
    },
    {
      value: 100,
      label: <CustomReviewMark value='100+' />
    }
  ];
  //#endregion
  // #region sort by number of Dimbs
  const [dimopen, dimSetOpen] = useState<boolean>(false);
  const CustomDimbMark: React.FC<CustomMarkProps> = ({ value }) => {
    return <Typography style={{ fontSize: '0.7rem' }}>{value}</Typography>;
  };
  const dimhandleOpen = () => {
    dimSetOpen(true);
  };
  const dimhandleClose = () => {
    dimSetOpen(false);
  };
  const dimmarks = [
    {
      value: 0,
      label: <CustomDimbMark value='0' />
    },
    {
      value: 10,
      label: <CustomDimbMark value='10+' />
    },
    {
      value: 50,
      label: <CustomDimbMark value='50+' />
    },
    {
      value: 100,
      label: <CustomDimbMark value='100+' />
    }
  ];
  // #endregion
  // #region sort by Ration
  const [ratopen, ratSetOpen] = useState<boolean>(false);
  const rathandleOpen = () => {
    ratSetOpen(true);
  };
  const rathandleClose = () => {
    ratSetOpen(false);
  };
  // #endregion

  const logoutbtn = () => {
    LogoutAPI(setLogout);
  };

  useEffect(() => {
    if (logout) {
      toast.success('로그아웃 되었습니다.');
      setLogout(false);
    }
  }, [logout]);

  //#region server status
  const [status, setStatus] = useRecoilState<string>(serverstatus);
  useEffect(() => {
    ServerStatusAPI(setStatus);
  }, []);
  useEffect(() => {
    if (status === 'Server Error') {
      toast.error('서버 점검중입니다.');
    }
  }, [status]);
  //#endregion
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
                onClick={logoutbtn}
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
      <div className='grid grid-cols-2'>
        <div className='ml-4 mt-2'>
          <div className='grid md:grid-cols-4'>
            <div
              className='text-xl font-bold w-fit'
              onMouseEnter={reshandleOpen}
              onMouseLeave={reshandleClose}
            >
              Restaurants
              {resopen ? (
                <div className='grid grid-cols-3 shadow-lg rounded-md'>
                  <MenuItem>한식</MenuItem>
                  <MenuItem>중식</MenuItem>
                  <MenuItem>일식</MenuItem>
                  <MenuItem>양식</MenuItem>
                </div>
              ) : null}
            </div>
            <div
              className='text-xl font-bold'
              onMouseEnter={reviewhandleOpen}
              onMouseLeave={reviewhandleClose}
            >
              Reviews
              {reviewopen ? (
                <div className='grid place-items-center shadow-lg rounded-md w-40 h-12 pl-4 pr-4'>
                  <Slider
                    aria-label='Reviews'
                    defaultValue={10}
                    step={null}
                    marks={reviewmarks}
                  />
                </div>
              ) : null}
            </div>
            <div
              className='text-xl font-bold'
              onMouseEnter={dimhandleOpen}
              onMouseLeave={dimhandleClose}
            >
              Dimbs
              {dimopen ? (
                <div className='grid place-items-center shadow-lg rounded-md w-40 h-12 pl-4 pr-4'>
                  <Slider
                    aria-label='Dimbs'
                    defaultValue={10}
                    step={null}
                    marks={dimmarks}
                  />
                </div>
              ) : null}
            </div>
            <div
              className='text-xl font-bold w-fit'
              onMouseEnter={rathandleOpen}
              onMouseLeave={rathandleClose}
            >
              Rating
              {ratopen ? (
                <div className='grid place-items-center shadow-lg rounded-md w-40 h-12 pl-4 pr-4'>
                  <Rating name='half-rating' defaultValue={0} precision={0.5} />
                </div>
              ) : null}
            </div>
          </div>
          <div className='mt-12'>
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
              {markerAPI === false ? (
                <SortLoading />
              ) : markerAPI === true && review.length === 0 ? (
                <SortLoading />
              ) : (
                <div className='overflow-auto h-[50vh] scrollbar-hide mt-2 mr-4'>
                  {review.map((item) => (
                    <Reviewcard
                      key={item.shopId}
                      review={item.recentReview}
                      rating={item.totalRating}
                      imageUrl={imageURL + item.image}
                      restaurantname={item.name}
                      address={item.address}
                      category={item.kind}
                      x={item.x}
                      y={item.y}
                      shopid={item.shopId}
                    />
                  ))}
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
