import React from 'react';
import restaurantimg from '../../assets/restaurant.jpg';
import { Button, createTheme } from '@mui/material';

let theme = createTheme({});
theme = createTheme(theme, {
  palette: {
    white: theme.palette.augmentColor({
      color: {
        main: '#ffffff'
      },
      name: 'white'
    })
  }
});

const Main = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${restaurantimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw'
      }}
      className='z-0 relative'
    >
      <div className='z-10 text-white'>
        <div className='grid grid-cols-3 ml-8 absolute bottom-6'>
          <div>
            <div className='text-6xl'>MASJIB</div>
            <Button
              variant='outlined'
              size='large'
              sx={{
                color: 'white',
                outlineColor: 'white',
                border: 3,
                ':hover': { borderColor: 'white', border: 3 },
                marginTop: 3,
                borderRadius: 30
              }}
            >
              Review
            </Button>
          </div>
          <div></div>
          <div className='text-3xl'>
            <div>This is a service to share your</div>
            <div>own delicious restaurants.</div>
            <div>We introduce various</div>
            <div>restaurants.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
