import {
  Box,
  Button,
  Drawer,
  MenuItem,
  Tab,
  Tabs,
  tabsClasses
} from '@mui/material';
import { useRecoilState } from 'recoil';
import { logoutstate, m_SearchModalState } from '../state/atom';
import Kakaomap from '../component/Kakaomap';
import { useEffect, useState } from 'react';
import React from 'react';
import { getCookie } from '../util/Cookie';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LogoutAPI } from '../apis/server';
import toast from 'react-hot-toast';

const M_Information = () => {
  const [modal, setModal] = useRecoilState<boolean>(m_SearchModalState);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const searchmodal = () => {
    setModal(true);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const menuDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  //#region logout
  const [logout, setLogout] = useRecoilState<boolean>(logoutstate);
  const logoutbtn = () => {
    LogoutAPI(setLogout);
  };

  useEffect(() => {
    if (logout) {
      toast.success('로그아웃 되었습니다.');
      setLogout(false);
    }
  }, [logout]);
  //#endregion

  return (
    <div className='h-screen w-screen overflow-hidden'>
      <div className='grid grid-cols-3 mt-2 border border-b-2 border-t-0 border-l-0 border-r-0 mb-2'>
        <div className='w-fit grid place-items-start'>
          <Button>
            <MoreVertIcon onClick={menuDrawer(true)} />
          </Button>
          {
            <Drawer anchor='left' open={open} onClose={menuDrawer(false)}>
              <div className='grid place-items-center'>
                <MenuItem
                  onClick={() => {
                    navigate('/profile');
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem>검색</MenuItem>
              </div>
            </Drawer>
          }
        </div>
        <div className='font-bold text-3xl text-blue-500 grid place-items-center'>
          MASJIB
        </div>
        <div className='text-end grid place-items-center'>
          {getCookie('access_token') ? (
            <Button
              className='place-items-center'
              variant='outlined'
              sx={{
                textAlign: 'center',
                color: 'white',
                height: '1.8rem',
                backgroundColor: '#3B82F6',
                borderColor: '#3B82F6',
                fontFamily: 'bold',
                fontSize: '0.8rem',
                ':hover': {
                  backgroundColor: '#3B82F6',
                  color: 'white'
                }
              }}
              onClick={logoutbtn}
            >
              Logout
            </Button>
          ) : (
            <Button
              className='place-items-center'
              variant='outlined'
              sx={{
                textAlign: 'center',
                color: 'white',
                height: '1.8rem',
                backgroundColor: '#3B82F6',
                borderColor: '#3B82F6',
                fontFamily: 'bold',
                fontSize: '0.8rem',
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
    </div>
  );
};
export default M_Information;
