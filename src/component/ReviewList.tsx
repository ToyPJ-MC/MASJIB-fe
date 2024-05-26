import StarIcon from '@mui/icons-material/Star';
import React, { useState } from 'react';
import CleanHandsOutlinedIcon from '@mui/icons-material/CleanHandsOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteMemberReviewAPI } from '../apis/server';

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
  if (confirm('리뷰를 삭제하시겠습니까?') === true) {
    DeleteMemberReviewAPI(reviewId);
  }
};

const ReviewList = (props: ReviewListProps) => {
  return (
    <div className='mb-2 border border-solid p-5'>
      <div>
        <div className='flex gap-1'>
          <StarIcon
            sx={{
              color: '#ffbf00'
            }}
          />
          <p className='w-[1rem] h-[1rem] text-gray-400'>
            {props.rating + '/5'}
          </p>
        </div>
        <div className='flex gap-2 mt-1'>
          {props.taste === 'good' ? (
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
          {props.kindness === 'good' ? (
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
      </div>
      <div className='mt-2'>
        {props.content.split(/\r\n|\r|\n/).map((line, index) =>
          index === 0 ? (
            <p key={index} className='font-semibold text-lg'>
              {line}
            </p>
          ) : (
            <p key={index}>{line}</p>
          )
        )}
      </div>
      <div className='flex mt-2'>
        {props.images.length > 0
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
      <div className='grid grid-cols-2 mt-2'>
        <div className='text-sm text-gray-500 font-medium grid items-center'>
          {props.date}
        </div>
        <div className='grid place-items-end'>
          <DeleteIcon
            fontSize='small'
            onClick={() => {
              DeleteReview(props.reviewId);
            }}
            sx={{
              color: '#cccccc'
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default ReviewList;
