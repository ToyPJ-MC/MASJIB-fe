import StarIcon from '@mui/icons-material/Star';
import React from 'react';
import CleanHandsOutlinedIcon from '@mui/icons-material/CleanHandsOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';

interface ReviewListProps {
  images: string[];
  rating: number;
  date: string;
  content: string;
  hygiene: string;
  taste: string;
  kindness: string;
  reviewId: number;
}
const imageURL = process.env.SERVER_URL;

const ReviewList = (props: ReviewListProps) => {
  return (
    <div>
      <div className='flex'>
        {props.images.length > 1
          ? props.images.map((image, index) => (
              <img
                key={index}
                src={imageURL + '/' + image}
                alt={`review${index}`}
                className='w-28 h-24'
              />
            ))
          : null}
      </div>
      <div className='flex'>
        <StarIcon
          sx={{
            color: '#ffbf00'
          }}
        />
        {props.rating + '/5'}
        {props.hygiene === 'good' ? (
          <RestaurantOutlinedIcon />
        ) : (
          <RestaurantOutlinedIcon />
        )}
        <CleanHandsOutlinedIcon />
        <TagFacesOutlinedIcon />
      </div>
      <div>{props.content}</div>
      <div className='flex'>
        <div className='text-sm font-medium grid items-cente'>{props.date}</div>
      </div>
    </div>
  );
};
export default ReviewList;
