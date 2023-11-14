import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import yami from '../assets/image.jpeg';

const Review = () => {
  const urlparams = new URLSearchParams(location.search);
  const params = {
    restaurantname: urlparams.get('restaurantname'),
    address: urlparams.get('address'),
    x: urlparams.get('x'),
    y: urlparams.get('y')
  };
  const slideRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const IMG_WIDTH = 300;
  const slideRange = currentSlide * IMG_WIDTH;

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${slideRange}px)`;
    }
  }, [currentSlide]);
  const moveToNextSlide = () => {
    if (currentSlide === 2) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const moveToPrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  return (
    <>
      <div className='w-[300px] overflow-hidden'>
        <Button onClick={moveToPrevSlide} className='z-10 text-left'>
          {'<'}
        </Button>
        <div ref={slideRef} className='flex w-full h-full'>
          <img src={yami} className='w-[300px]' />
          <img src={yami} className='w-[300px]' />
          <img src={yami} className='w-[300px]' />
          <img src={yami} className='w-[300px]' />
        </div>
        <Button onClick={moveToNextSlide} className='z-10 text-right'>
          {'>'}
        </Button>
      </div>
      <div>{params.restaurantname}</div>
      <div>{params.address}</div>
      <div>{params.x}</div>
      <div>{params.y}</div>
    </>
  );
};
export default Review;
