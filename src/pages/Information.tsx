import React from 'react';
import {
  Autocomplete,
  Button,
  ButtonGroup,
  Rating,
  TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Kakaomap from '../component/Kakaomap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dumydataState } from '../state/atom';
import Reviewcard from '../component/Reviewcard';
const Information = () => {
  const categoriesChange = ['한식', '중식', '일식', '양식'];
  const reviewcard = useRecoilValue(dumydataState);
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
          >
            Log In
          </Button>
        </div>
      </div>
      <div className='grid grid-cols-2'>
        <div className='ml-4'>
          <div className='grid grid-cols-2'>
            <div>
              <div className='text-base font-semibold'>Categories</div>
              <ButtonGroup
                variant='outlined'
                aria-label='outlined button group'
              >
                <Button>Korean</Button>
                <Button>Chinese</Button>
              </ButtonGroup>
              <ButtonGroup
                variant='outlined'
                aria-label='outlined button group'
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
              <div className='overflow-auto h-96 scrollbar-hide mt-2'>
                {reviewcard.map((item, index) => {
                  return (
                    <Reviewcard
                      key={index}
                      review={item.review}
                      rating={item.rating}
                      imageUrl={item.imageUrl}
                      restaurantname={item.restaurantname}
                      address={item.address}
                      category={item.category}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div>{/* <Kakaomap /> */}</div>
      </div>
    </div>
  );
};
export default Information;
