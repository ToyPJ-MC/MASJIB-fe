import { Card, Rating, Typography } from '@mui/material';
import { Button } from 'evergreen-ui';
import ximage from 'src/assets/준비중.jpeg';
import React from 'react';
interface ReviewcardProps {
  review: string;
  rating: number;
  restaurantname: string;
  address: string;
  category: string;
  imageUrl: string;
  x: number;
  y: number;
  shopid: number;
}
const serverimageURL = process.env.SERVER_URL;

const ReviewcardOnClick = (
  name: string,
  shopId: number,
  x: number,
  y: number
) => {
  window.open(
    `/review?restaurantname=${name}&shopid=${shopId}&x=${x}&y=${y}`,
    '_blank'
  );
};

const Reviewcard = (props: ReviewcardProps) => {
  return (
    <Card
      className='min-w-full hover:border'
      onClick={() =>
        ReviewcardOnClick(props.restaurantname, props.shopid, props.x, props.y)
      }
    >
      <div className='flex'>
        <div className='w-48'>
          {props.imageUrl !== serverimageURL + '/등록된 사진이 없습니다.' ? (
            <img
              src={props.imageUrl}
              alt={props.restaurantname}
              className='w-48 h-48'
            />
          ) : (
            <img src={ximage} className='w-48 h-48' />
          )}
        </div>
        <div className='ml-2'>
          <div className='text-2xl font-bold mt-2'>{props.restaurantname}</div>
          <div>
            <div className='text-sm font-thin mt-2'>{props.address}</div>
            <Button size='small'>{props.category}</Button>
          </div>
          <div className='grid grid-cols-2 w-fit'>
            <div className='w-fit grid items-center'>
              <Rating
                name='half-rating'
                defaultValue={props.rating}
                precision={0.5}
                readOnly
              />
            </div>
            <div className='text-sm font-light grid items-center'>
              {props.rating}
            </div>
          </div>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ marginTop: '4px' }}
          >
            {props.review.split(/\r\n|\r|\n/).map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </Typography>
        </div>
      </div>
    </Card>
  );
};
export default Reviewcard;
