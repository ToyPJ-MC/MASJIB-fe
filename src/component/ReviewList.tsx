import StarIcon from '@mui/icons-material/Star';
import React, { useState } from 'react';
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
  if (confirm('리뷰를 삭제하시겠습니까?') === true) {
    DeleteMemberReviewAPI(reviewId);
  }
};

const ReviewList = (props: ReviewListProps) => {
  //console.log(imageURL + '/' + props.images);
  return (
    <div className='mb-2 border border-solid p-5'>
      <div className='flex gap-1 justify-evenly mt-2'>
        <div>
          <StarIcon
            sx={{
              color: '#ffbf00'
            }}
          />
          {props.rating + '/5'}
        </div>
        <div className='flex gap-2'>
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
      <div className='mt-2 ml-2'>{props.content}</div>
      <div className='flex mt-2 ml-2'>
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
      <div className='grid grid-cols-2'>
        <div className='text-sm font-medium grid items-center'>
          {props.date}
        </div>
        <div className='grid place-items-end'>
          <DeleteIcon
            fontSize='small'
            onClick={() => {
              DeleteReview(props.reviewId);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default ReviewList;
