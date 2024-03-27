import { Box, Button, Tab, Tabs, tabsClasses } from '@mui/material';
import { useRecoilState } from 'recoil';
import { loginmodalState } from '../state/atom';
import Kakaomap from '../component/Kakaomap';
import { useState } from 'react';

const M_Information = () => {
  const [modal, setModal] = useRecoilState<boolean>(loginmodalState);
  const [value, setValue] = useState(0);

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
              <Tab label='Item One' />
              <Tab label='Item Two' />
              <Tab label='Item Three' />
              <Tab label='Item Four' />
              <Tab label='Item Five' />
              <Tab label='Item Six' />
              <Tab label='Item Seven' />
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
