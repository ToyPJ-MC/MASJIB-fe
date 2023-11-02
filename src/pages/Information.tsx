import React from 'react';
import { Autocomplete, Button, Rating, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Kakaomap from '../component/Kakaomap';
const Information = () => {
  const categoriesChange = ['한식', '중식', '일식', '양식'];
  const navigate = useNavigate();
  const homebtn = () => {
    navigate('/'); // home
  };
  return (
    <div>
      <div className='grid grid-cols-4 mt-8 items-center place-content-center'>
        <div
          className='font-bold text-4xl text-blue-500 ml-6'
          onClick={homebtn}
        >
          MASJIB
        </div>
        <div className='col-span-2 grid grid-cols-2'>
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
        <Button
          variant='outlined'
          sx={{
            textAlign: 'center',
            width: '25%',
            height: '3em',
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
      <div className='grid grid-cols-2'>
        <div>
          <div className='grid grid-cols-2'>
            <div>Categories</div>
            <div className='grid grid-rows-3'>
              <div>
                <div>Price</div>
              </div>
              <div>
                <div>Rating</div>
                <Rating name='half-rating' defaultValue={2.5} precision={0.5} />
              </div>
              <div>Favorite</div>
            </div>
          </div>
          <div>Categories에 따른 음식점 리뷰들</div>
        </div>
        <div>
          <Kakaomap />
        </div>
      </div>
    </div>
  );
};
export default Information;
