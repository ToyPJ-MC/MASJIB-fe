import React from 'react';
import restaurantimg from '../../assets/restaurant.jpg';

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
      className='z-0'
    >
      <div className='text-lg text-white font-bold z-10'>Main</div>
    </div>
  );
};
export default Main;
