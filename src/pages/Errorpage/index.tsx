import Lottie from 'lottie-react';
import erroranmation from '../../assets/errorpage.json';
import React from 'react';

const Errorpage = () => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <Lottie animationData={erroranmation} className='w-96 h-96' />
      </div>
    </>
  );
};
export default Errorpage;
