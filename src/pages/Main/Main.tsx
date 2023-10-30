import React from 'react';
import test from '../../assets/restaurant.jpg';

const Main = () => {
  console.log(test);
  return (
    <div
      style={{
        backgroundImage: `url(${test})`,
        backgroundSize: 'cover'
      }}
    >
      <h1>Main</h1>
    </div>
  );
};
export default Main;
