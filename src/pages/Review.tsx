import {
  FormControl,
  IconButton,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  Slider
} from '@mui/material';
import React from 'react';
import ximg from '../assets/준비중.jpeg';
import Carousel from 'react-material-ui-carousel';
import StarIcon from '@mui/icons-material/Star';
import { StarBorder } from '@mui/icons-material';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import CleanHandsOutlinedIcon from '@mui/icons-material/CleanHandsOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  MemberReviewListState,
  RestaurantReviewListState,
  writemodalState
} from '../state/atom';
import Write from '../component/Write';
import '../styles/global.css';
import {
  MemberReviewAPI,
  RestaurantDetailAPI,
  RestaurantImagesAPI
} from '../apis/server';
import { getCookie, removeCookie } from '../util/Cookie';
import { MemberReviewListType, RestaurantDetailType } from '../types';
import toast from 'react-hot-toast';
import ReviewList from '../component/ReviewList';
const Review = () => {
  const urlparams = new URLSearchParams(location.search);
  const imageUrl = process.env.SERVER_URL;
  const [sort, setSort] = useState<string>('newest');
  const [sortReview, setSortReview] = useState<string>('based');
  const [open, setOpen] = useRecoilState<boolean>(writemodalState);
  const params = {
    restaurantname: urlparams.get('restaurantname'),
    shopid: urlparams.get('shopid'),
    x: urlparams.get('x'),
    y: urlparams.get('y')
  };
  const sortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };
  const sortReviewChange = (event: SelectChangeEvent) => {
    setSortReview(event.target.value as string);
  };
  //#region restaurant images
  const [imagesList, setImagesList] = useState<string[]>([]);
  useEffect(() => {
    RestaurantImagesAPI(Number(params.shopid), setImagesList);
  }, []);
  const totalimg = 6;
  const placehoder = totalimg - imagesList.length;
  const ImageList = [...imagesList];
  if (placehoder < totalimg) {
    for (let i = 0; i < placehoder; i++) {
      ImageList.push(ximg);
    }
  }
  const slides = [];
  for (let i = 0; i < ImageList.length; i += 3) {
    slides.push(ImageList.slice(i, i + 3));
  }
  //#endregion
  const WriteReview = () => {
    if (getCookie('access_token') !== undefined) {
      setOpen(true);
    } else {
      toast.error('로그인이 필요합니다');
      setOpen(false);
    }
  };
  const [memberReview, setMemberReview] = useRecoilState<MemberReviewListType>(
    MemberReviewListState
  );
  const [RestaurantDetail, setRestaurantDetail] =
    useRecoilState<RestaurantDetailType | null>(RestaurantReviewListState);
  useEffect(() => {
    if (getCookie('access_token') !== undefined) {
      MemberReviewAPI(setMemberReview);
    }
  }, []);
  useEffect(() => {
    if (
      getCookie('deletestatus') === 'success' &&
      getCookie('access_token') !== undefined
    ) {
      toast.success('리뷰를 삭제하였습니다');
      removeCookie('deletestatus');
    }
  }, []);
  useEffect(() => {
    RestaurantDetailAPI(
      Number(params.shopid),
      sort,
      sortReview,
      1,
      setRestaurantDetail
    );
  }, []);
  const TotalRating =
    Math.ceil(Number(RestaurantDetail?.totalRating) * 10) / 10;
  const fivestart = RestaurantDetail?.restaurant.rating.five ?? 0;
  const fourstart =
    (RestaurantDetail?.restaurant.rating.four ?? 0) +
    (RestaurantDetail?.restaurant.rating.fourHalf ?? 0);
  const threestart =
    (RestaurantDetail?.restaurant.rating.three ?? 0) +
    (RestaurantDetail?.restaurant.rating.threeHalf ?? 0);
  const twostart =
    (RestaurantDetail?.restaurant.rating.two ?? 0) +
    (RestaurantDetail?.restaurant.rating.twoHalf ?? 0);
  const onestart =
    (RestaurantDetail?.restaurant.rating.one ?? 0) +
    (RestaurantDetail?.restaurant.rating.oneHalf ?? 0);
  const zerostart = RestaurantDetail?.restaurant.rating.zero ?? 0;
  return (
    <>
      {open ? <Write /> : null}
      <div className='z-0 relative w-full'>
        <Carousel
          autoPlay={false}
          animation='slide'
          navButtonsAlwaysVisible
          indicators={false}
        >
          {slides.map((slide, slideindex) => (
            <div className='grid grid-cols-3 w-full h-80' key={slideindex}>
              {slide.map((item, index) => (
                <img
                  src={
                    item.startsWith('images/') ? `${imageUrl}/${item}` : item
                  }
                  className='w-screen h-80 brightness-[0.7]'
                  key={index}
                  alt={`image-${index}`}
                />
              ))}
            </div>
          ))}
        </Carousel>
        <div className='z-10 l absolute bottom-14 left-32'>
          <div className='font-extrabold text-white text-3xl'>
            {params.restaurantname}
          </div>
          <div className='flex gap-2'>
            <div className='w-fit grid items-center'>
              <Rating
                name='half-rating'
                value={TotalRating}
                precision={0.5}
                readOnly
                size='large'
                emptyIcon={
                  <StarIcon className='text-white' fontSize='inherit' />
                }
              />
            </div>
            <div className='text-md font-medium grid items-center text-white'>
              {RestaurantDetail?.totalRating}
            </div>
          </div>
          <div className='text-sm font-medium grid items-center text-white mt-2'>
            {RestaurantDetail?.restaurant.address}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 mt-4'>
        <div>
          <div className='grid grid-cols-3 place-items-center ml-4'>
            <div>
              <IconButton
                sx={{
                  backgroundColor: '#3B82F6',
                  borderRadius: 5,
                  outlineColor: '#3B82F6',
                  fontSize: '0.8em',
                  color: 'white',
                  ':hover': {
                    backgroundColor: '#3B82F6',
                    color: 'small'
                  }
                }}
                onClick={WriteReview}
              >
                <StarBorder sx={{ color: 'white' }} fontSize='medium' />
                Write Review
              </IconButton>
            </div>
            <div className='grid place-items-center'>
              <IconButton
                sx={{
                  backgroundColor: '#3B82F6',
                  borderRadius: 5,
                  outlineColor: '#3B82F6',
                  fontSize: '0.8em',
                  color: 'white',
                  ':hover': {
                    backgroundColor: '#3B82F6',
                    color: 'white'
                  }
                }}
              >
                <IosShareOutlinedIcon
                  sx={{ color: 'white' }}
                  fontSize='small'
                />
                Share
              </IconButton>
            </div>
            <div className='grid place-items-center'>
              <IconButton
                sx={{
                  backgroundColor: '#3B82F6',
                  borderRadius: 5,
                  outlineColor: '#3B82F6',
                  fontSize: '0.8em',
                  color: 'white',
                  ':hover': {
                    backgroundColor: '#3B82F6',
                    color: 'white'
                  }
                }}
              >
                <BookmarkAddOutlinedIcon
                  sx={{ color: 'white' }}
                  fontSize='small'
                />
                Bookmark
              </IconButton>
            </div>
          </div>
          <div className='grid grid-cols-2 place-items-center'>
            <div>
              <div className='text-center font-bold text-xl mt-10'>
                Overall Rating
              </div>
              <div className='grid place-items-center'>
                <Rating
                  name='half-rating'
                  value={TotalRating}
                  precision={0.5}
                  readOnly
                  size='large'
                  emptyIcon={
                    <StarIcon className='text-gray-300' fontSize='inherit' />
                  }
                />
              </div>
              <div className='grid grid-cols-2 place-items-center mt-2'>
                <div className='text-xl font-medium text-start'>
                  {RestaurantDetail?.totalRating}
                </div>
                <div className='text-lg font-normal'>{`${RestaurantDetail?.reviews.length} Reviewes`}</div>
              </div>
            </div>
            <div className='grid grid-rows-5 mt-4 w-full'>
              <div className='grid grid-cols-2'>
                <div className='grid place-items-center text-sm text-gray-600'>
                  5 Stars
                </div>
                <div className='grid items-center'>
                  <Slider
                    aria-label='Five stars'
                    value={fivestart}
                    max={RestaurantDetail?.restaurant.rating.count}
                    min={0}
                    sx={{ color: '#3B82F6' }}
                    componentsProps={{ thumb: { style: { display: 'none' } } }}
                  />
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='grid place-items-center text-sm text-gray-600'>
                  4 Stars
                </div>
                <div className='grid items-center'>
                  <Slider
                    aria-label='Four stars'
                    value={fourstart}
                    max={RestaurantDetail?.restaurant.rating.count}
                    min={0}
                    sx={{ color: '#3B82F6' }}
                    componentsProps={{ thumb: { style: { display: 'none' } } }}
                  />
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='grid place-items-center text-sm text-gray-600'>
                  3 Stars
                </div>
                <div className='grid items-center'>
                  <Slider
                    aria-label='Three stars'
                    value={threestart}
                    max={RestaurantDetail?.restaurant.rating.count}
                    min={0}
                    sx={{ color: '#3B82F6' }}
                    componentsProps={{ thumb: { style: { display: 'none' } } }}
                  />
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='grid place-items-center text-sm text-gray-600'>
                  2 Stars
                </div>
                <div className='grid items-center'>
                  <Slider
                    aria-label='Two stars'
                    value={twostart}
                    max={RestaurantDetail?.restaurant.rating.count}
                    min={0}
                    sx={{ color: '#3B82F6' }}
                    componentsProps={{ thumb: { style: { display: 'none' } } }}
                  />
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='grid place-items-center text-sm text-gray-600'>
                  1 Stars
                </div>
                <div className='w-full'>
                  <Slider
                    aria-label='One stars'
                    value={onestart}
                    max={RestaurantDetail?.restaurant.rating.count}
                    min={0}
                    sx={{ color: '#3B82F6' }}
                    componentsProps={{ thumb: { style: { display: 'none' } } }}
                  />
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='grid place-items-center text-sm text-gray-600'>
                  0 Stars
                </div>
                <div className='grid items-center'>
                  <Slider
                    aria-label='Zero stars'
                    value={zerostart}
                    max={RestaurantDetail?.restaurant.rating.count}
                    min={0}
                    sx={{ color: '#3B82F6' }}
                    componentsProps={{ thumb: { style: { display: 'none' } } }}
                  />
                </div>
              </div>
            </div>
            {/* <div className='grid place-items-center text-center font-bold text-2xl'>
              이 음식점은 맛집입니다!!
            </div>{' '} */}
            {/* 4.0 이상일 경우 대단한 맛집, 3.5 이상일 경우 맛집, 3.5 미만일 경우 아쉬운 맛집 */}
          </div>
          <div className='grid grid-cols-3 mt-10'>
            <div className='grid place-items-center'>
              <RestaurantOutlinedIcon fontSize='large' />
              <div className='text-lg font-semibold'>맛</div>
              <div className='grid grid-cols-2'>
                <div className='grid place-items-center'>
                  <ThumbUpAltOutlinedIcon
                    sx={{ color: '#1E90FF' }}
                    fontSize='medium'
                  />
                  <div className='font-medium text-sm'>
                    {RestaurantDetail?.restaurant.assessment.goodTaste}
                  </div>
                </div>
                <div className='grid place-items-center'>
                  <ThumbDownAltOutlinedIcon
                    sx={{ color: '#FF4500' }}
                    fontSize='medium'
                  />
                  <div className='font-medium text-sm'>
                    {RestaurantDetail?.restaurant.assessment.badTaste}
                  </div>
                </div>
              </div>
            </div>
            <div className='grid place-items-center'>
              <CleanHandsOutlinedIcon fontSize='large' />
              <div className='text-lg font-semibold'>위생</div>
              <div className='grid grid-cols-2'>
                <div className='grid place-items-center'>
                  <ThumbUpAltOutlinedIcon
                    sx={{ color: '#1E90FF' }}
                    fontSize='medium'
                  />
                  <div className='font-medium text-sm'>
                    {RestaurantDetail?.restaurant.assessment.goodHygiene}
                  </div>
                </div>
                <div className='grid place-items-center'>
                  <ThumbDownAltOutlinedIcon
                    sx={{ color: '#FF4500' }}
                    fontSize='medium'
                  />
                  <div className='font-medium text-sm'>
                    {RestaurantDetail?.restaurant.assessment.badHygiene}
                  </div>
                </div>
              </div>
            </div>
            <div className='grid place-items-center'>
              <TagFacesOutlinedIcon fontSize='large' />
              <div className='text-lg font-semibold'>친절함</div>
              <div className='grid grid-cols-2'>
                <div className='grid place-items-center'>
                  <ThumbUpAltOutlinedIcon
                    sx={{ color: '#1E90FF' }}
                    fontSize='medium'
                  />
                  <div className='font-medium text-sm'>
                    {RestaurantDetail?.restaurant.assessment.kindness}
                  </div>
                </div>
                <div className='grid place-items-center'>
                  <ThumbDownAltOutlinedIcon
                    sx={{ color: '#FF4500' }}
                    fontSize='medium'
                  />
                  <div className='font-medium text-sm'>
                    {RestaurantDetail?.restaurant.assessment.unKindness}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-20 ml-8 grid grid-cols-2'>
            <div>
              <div>Sort by</div>
              <FormControl>
                <Select
                  labelId='demo-controlled-open-select-label'
                  id='demo-controlled-open-select'
                  value={sort}
                  onChange={sortChange}
                >
                  <MenuItem value={'newest'}>Newest First</MenuItem>
                  <MenuItem value={'oldest'}>Oldest First</MenuItem>
                  <MenuItem value={'highest'}>Highest Rated</MenuItem>
                  <MenuItem value={'lowest'}>Lowest Rated</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <div>Review by</div>
              <FormControl>
                <Select
                  labelId='demo-controlled-open-select-label'
                  id='demo-controlled-open-select'
                  value={sortReview}
                  onChange={sortReviewChange}
                >
                  <MenuItem value={'based'}>Based Review</MenuItem>
                  <MenuItem value={'onlyPictures'}>
                    Only Pictures Review
                  </MenuItem>
                  <MenuItem value={'onlyText'}>Only Writing Review</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className='mt-20 ml-8'>리뷰 리스트</div>
        </div>
        <div className='flex justify-center items-center pl-8 pr-8'>
          <div className='w-full'>
            {memberReview.map((item, index) =>
              item.shopId === Number(params.shopid) ? (
                <ReviewList
                  key={index}
                  content={item.comment}
                  date={item.createTime}
                  images={item.paths}
                  rating={item.rating}
                  hygiene={item.hygiene}
                  kindness={item.kindness}
                  taste={item.taste}
                  reviewId={item.reviewId}
                />
              ) : null
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Review;
