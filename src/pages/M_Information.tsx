import { Box, Button, Tab, Tabs, tabsClasses } from '@mui/material';
import { useRecoilState } from 'recoil';
import { m_SearchModalState } from '../state/atom';
import Kakaomap from '../component/Kakaomap';
import { useState } from 'react';
import React from 'react';
import M_SearchModal from '../component/M_SearchModal';
import { getCookie } from '../util/Cookie';
import { useNavigate } from 'react-router-dom';

const M_Information = () => {
  const [modal, setModal] = useRecoilState<boolean>(m_SearchModalState);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const searchmodal = () => {
    setModal(true);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className='h-screen w-screen overflow-hidden'>
      <div className='grid grid-cols-2 mt-2 items-center place-content-center border border-b-2 border-t-0 border-l-0 border-r-0'>
        <div className='font-bold text-3xl text-blue-500 mb-2 text-start ml-2'>
          MASJIB
        </div>
        <div className='text-end mr-2 mb-2'>
          {getCookie('access_token') ? (
            <div className='grid grid-cols-2'>
              <Button
                onClick={() => {
                  navigate('/profile');
                }}
              >
                Profile
              </Button>
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
                location.href =
                  'http://35.216.61.47:18080/oauth2/authorization/kakao';
              }}
            >
              Log In
            </Button>
          )}
        </div>
      </div>
      <div className='h-full'>
        <div>
          <Box sx={{ width: '100vw', bgcolor: 'background.paper' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant='scrollable'
              scrollButtons
              allowScrollButtonsMobile
              aria-label='scrollable force tabs'
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  '&.Mui-disabled': { opacity: 0.3 }
                }
              }}
            >
              <Tab label='내 주변 맛집' />
              <Tab label='검색' onClick={searchmodal} />
              <Tab label='최고의 맛집' />
              <Tab label='등록' />
              <Tab label='한식' />
              <Tab label='중식' />
              <Tab label='일식' />
              <Tab label='양식' />
            </Tabs>
          </Box>
        </div>
        <div>
          <Kakaomap />
        </div>
      </div>
      {/* {modal ? <M_SearchModal /> : null} */}
      <M_SearchModal />
    </div>
  );
};
export default M_Information;
