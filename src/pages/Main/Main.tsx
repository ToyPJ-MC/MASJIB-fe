import React from 'react';
import restaurantimg from '../../assets/restaurant.jpg';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const userAgent = window.navigator.userAgent;
  const mapbtn = () => {
    if (userAgent.includes('iPhone') || userAgent.includes('Android')) {
      navigate('/m_information');
    } else {
      navigate('/information');
    }
  };
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
        <div className='absolute bottom-6 left-4 md:left-8'>
          <div className='text-6xl'>MASJIB</div>
          <Button
            variant='outlined'
            size='large'
            sx={{
              color: 'white',
              outlineColor: 'white',
              border: 3,
              ':hover': {
                borderColor: 'white',
                border: 3,
                backgroundColor: 'whitesmoke',
                color: 'black'
              },
              marginTop: 3,
              borderRadius: 30,
              textAlign: 'center',
              fontWeight: 'bold'
            }}
            onClick={mapbtn}
          >
            Review
          </Button>
        </div>
        <div className='text-xl left-2 md:text-4xl absolute md:bottom-6 md:left-[85rem]'>
          <div>This is a service to share your</div>
          <div>own delicious restaurants.</div>
          <div>We introduce various</div>
          <div>restaurants.</div>
        </div>
      </div>
    </div>
  );
};
export default Main;
