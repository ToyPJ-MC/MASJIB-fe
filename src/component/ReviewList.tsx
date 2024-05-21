import StarIcon from '@mui/icons-material/Star';
import React from 'react';
import CleanHandsOutlinedIcon from '@mui/icons-material/CleanHandsOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteMemberReviewAPI } from '../apis/server';
import { MemberReviewListState } from '../state/atom';

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

const DeleteReview = (reviewId: number) => {
  DeleteMemberReviewAPI(reviewId);
};

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
      <div className='flex gap-1'>
        <StarIcon
          sx={{
            color: '#ffbf00'
          }}
        />
        {props.rating + '/5'}
        {props.hygiene === 'good' ? (
          <RestaurantOutlinedIcon
            sx={{
              color: '#0066ff'
            }}
          />
        ) : (
          <RestaurantOutlinedIcon
            sx={{
              color: '#ff0000'
            }}
          />
        )}
        {props.hygiene === 'good' ? (
          <CleanHandsOutlinedIcon
            sx={{
              color: '#0066ff'
            }}
          />
        ) : (
          <CleanHandsOutlinedIcon
            sx={{
              color: '#ff0000'
            }}
          />
        )}
        {props.hygiene === 'good' ? (
          <TagFacesOutlinedIcon
            sx={{
              color: '#0066ff'
            }}
          />
        ) : (
          <TagFacesOutlinedIcon
            sx={{
              color: '#ff0000'
            }}
          />
        )}
      </div>
      <div>{props.content}</div>
      <div className='grid grid-cols-2'>
        <div className='text-sm font-medium grid items-cente'>{props.date}</div>
        <div
          onClick={() => {
            DeleteReview(props.reviewId);
          }}
        >
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
};
export default ReviewList;
