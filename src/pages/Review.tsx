import {
  Button,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  Slider
} from '@mui/material';
import yami from '../assets/image.jpeg';
import rest from '../assets/restaurant.jpg';
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
import { BlogSearchAPI } from '../apis/server';
import { useRecoilState } from 'recoil';
import { searchImageType } from '../types';
import { searchImageState, writemodalState } from '../state/atom';
import Write from '../component/Write';
import '../styles/global.css';
const Review = () => {
  const urlparams = new URLSearchParams(location.search);
  const [sort, setSort] = useState<string>('Newest First');
  const [sortReview, setSortReview] = useState<string>('Based Review');
  const [blog, setBlog] = useRecoilState<searchImageType>(searchImageState);
  const [open, setOpen] = useRecoilState<boolean>(writemodalState);
  const params = {
    restaurantname: urlparams.get('restaurantname'),
    address: urlparams.get('address'),
    x: urlparams.get('x'),
    y: urlparams.get('y')
  };
  const sortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };
  const sortReviewChange = (event: SelectChangeEvent) => {
    setSortReview(event.target.value as string);
  };
  const data = [
    {
      id: 1,
      imgAddress: yami
    },
    {
      id: 2,
      imgAddress: rest
    },
    {
      id: 3,
      imgAddress: rest
    },
    {
      id: 4,
      imgAddress: rest
    },
    {
      id: 5,
      imgAddress: yami
    },
    {
      id: 6,
      imgAddress: rest
    },
    {
      id: 7,
      imgAddress: yami
    },
    {
      id: 8,
      imgAddress: rest
    }
  ];
  const chunkArray = (arr: any, size: number) => {
    const imageList = [];
    for (let i = 0; i < data.length; i += size) {
      imageList.push(arr.slice(i, i + size));
    }
    return imageList;
  };
  const imageList = chunkArray(data, 2);
  useEffect(() => {
    BlogSearchAPI(params.restaurantname + params.address!, setBlog);
  }, []);
  const WriteReview = () => {
    setOpen(true);
  };
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
          {imageList.map((item, index) => {
            return (
              <div key={index} className='grid grid-cols-2 w-full h-80'>
                {item.map((item: any) => {
                  return (
                    <img
                      src={item.imgAddress}
                      alt={item.imgAddress}
                      className='w-screen h-80 brightness-[0.7]'
                      key={item.id}
                    />
                  );
                })}
              </div>
            );
          })}
        </Carousel>
        <div className='z-10 l absolute bottom-14 left-32'>
          <div className='font-extrabold text-white text-3xl'>
            {params.restaurantname}
          </div>
          <div className='grid grid-cols-2'>
            <div className='w-fit grid items-center'>
              <Rating
                name='half-rating'
                defaultValue={3.5}
                precision={0.5}
                readOnly
                size='large'
                emptyIcon={
                  <StarIcon className='text-white' fontSize='inherit' />
                }
              />
            </div>
            <div className='text-sm font-medium grid items-center text-white'>
              3.5 (167reviews)
            </div>
          </div>
          <div className='text-sm font-medium grid items-center text-white mt-2'>
            {params.address}
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
                  defaultValue={3.5}
                  precision={0.5}
                  readOnly
                  size='large'
                  emptyIcon={
                    <StarIcon className='text-gray-300' fontSize='inherit' />
                  }
                />
              </div>
              <div className='grid grid-cols-2 place-items-center mt-2'>
                <div className='text-xl font-medium text-start'>3.5</div>
                <div className='text-lg font-normal'>167 Reviews</div>
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
                    defaultValue={44}
                    value={44}
                    max={100}
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
                    defaultValue={86}
                    value={86}
                    max={100}
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
                    defaultValue={50}
                    value={50}
                    max={100}
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
                    defaultValue={27}
                    value={27}
                    max={100}
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
                    defaultValue={30}
                    value={30}
                    max={100}
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
                    defaultValue={10}
                    value={10}
                    max={100}
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
                  <div className='font-medium text-sm'>4</div>
                </div>
                <div className='grid place-items-center'>
                  <ThumbDownAltOutlinedIcon
                    sx={{ color: '#FF4500' }}
                    fontSize='medium'
                  />
                  <div className='font-medium text-sm'>3</div>
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
                  <div className='font-medium text-sm'>3</div>
                </div>
                <div className='grid place-items-center'>
                  <ThumbDownAltOutlinedIcon
                    sx={{ color: '#FF4500' }}
                    fontSize='medium'
                  />
                  <div className='font-medium text-sm'>8</div>
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
                  <div className='font-medium text-sm'>1</div>
                </div>
                <div className='grid place-items-center'>
                  <ThumbDownAltOutlinedIcon
                    sx={{ color: '#FF4500' }}
                    fontSize='medium'
                  />
                  <div className='font-medium text-sm'>0</div>
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
                  <MenuItem value={'Newest First'}>Newest First</MenuItem>
                  <MenuItem value={'Oldest First'}>Oldest First</MenuItem>
                  <MenuItem value={'Highest Rated'}>Highest Rated</MenuItem>
                  <MenuItem value={'Lowest Rated'}>Lowest Rated</MenuItem>
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
                  <MenuItem value={'Based Review'}>Based Review</MenuItem>
                  <MenuItem value={'Only Pictures Review'}>
                    Only Pictures Review
                  </MenuItem>
                  <MenuItem value={'Only Writing Review'}>
                    Only Writing Review
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        {blog.length !== 0 ? (
          <div className='grid place-items-center'>
            <ImageList
              sx={{
                width: 500,
                height: 450,
                border: '3px solid black'
              }}
              cols={3}
              rowHeight={164}
            >
              {blog.map((item, index) => (
                <ImageListItem key={index}>
                  <img
                    srcSet={`${item.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.imageUrl}?w=164&h=164&fit=crop&auto=format`}
                    onClick={() => {
                      window.open(item.doc_url, '_blank');
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default Review;
