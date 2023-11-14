import { Button, Rating } from '@mui/material';
import yami from '../assets/image.jpeg';
import rest from '../assets/restaurant.jpg';
import Carousel from 'react-material-ui-carousel';
import StarIcon from '@mui/icons-material/Star';
import { StarBorder } from '@mui/icons-material';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
const Review = () => {
  const urlparams = new URLSearchParams(location.search);
  const params = {
    restaurantname: urlparams.get('restaurantname'),
    address: urlparams.get('address'),
    x: urlparams.get('x'),
    y: urlparams.get('y')
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
  return (
    <>
      <div className='z-0 relative'>
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
                    <div>
                      <img
                        src={item.imgAddress}
                        alt={item.imgAddress}
                        className='w-full h-80 brightness-[0.7]'
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </Carousel>
        <div className='z-10 l absolute bottom-24 left-32'>
          <div className='font-extrabold text-white text-3xl'>
            {params.restaurantname}
          </div>
          <div className='grid grid-cols-2 w-fit'>
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
            <div className='text-sm font-medium grid items-center text-white mt-2'>
              {params.address}
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 mt-4'>
        <div>
          <div className='grid grid-cols-3 place-items-center ml-4'>
            <div>
              <Button
                variant='outlined'
                sx={{
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#3B82F6',
                  placeItems: 'center',
                  borderColor: '#3B82F6',
                  fontFamily: 'bold',
                  fontSize: '0.8em',
                  ':hover': {
                    backgroundColor: '#3B82F6',
                    color: 'white'
                  }
                }}
              >
                <StarBorder sx={{ placeItems: 'center' }} fontSize='small' />
                Write Review
              </Button>
            </div>
            <div>
              <Button
                variant='outlined'
                sx={{
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#3B82F6',
                  placeItems: 'center',
                  borderColor: '#3B82F6',
                  fontFamily: 'bold',
                  fontSize: '0.8em',
                  ':hover': {
                    backgroundColor: '#3B82F6',
                    color: 'white'
                  }
                }}
              >
                <IosShareOutlinedIcon
                  sx={{ placeItems: 'center' }}
                  fontSize='small'
                />
                Share
              </Button>
            </div>
            <div>
              <Button
                variant='outlined'
                sx={{
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#3B82F6',
                  placeItems: 'center',
                  borderColor: '#3B82F6',
                  fontFamily: 'bold',
                  fontSize: '0.8em',
                  ':hover': {
                    backgroundColor: '#3B82F6',
                    color: 'white'
                  }
                }}
              >
                <BookmarkAddOutlinedIcon
                  sx={{ placeItems: 'center' }}
                  fontSize='small'
                />
                Bookmark
              </Button>
            </div>
          </div>
          <div className='grid grid-cols-4 place-items-center ml-12 mt-10'>
            <div>
              <div>Overall Rating</div>
              <div className='w-fit grid items-center'>
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
              <div className='grid grid-cols-2 w-fit'>
                <div className='text-sm font-medium grid items-center'>3.5</div>
                <div className='text-sm font-medium grid items-center'>
                  (167reviews)
                </div>
              </div>
            </div>
            <div className='grid place-items-center'>
              <div>맛</div>
              <div className='grid grid-cols-2'>
                <div className='grid place-items-center'>
                  <ThumbUpAltOutlinedIcon />
                  <div>4</div>
                </div>
                <div className='grid place-items-center'>
                  <ThumbDownAltOutlinedIcon />
                  <div>3</div>
                </div>
              </div>
            </div>
            <div className='grid place-items-center'>
              <div>위생</div>
              <div className='grid grid-cols-2'>
                <div className='grid place-items-center'>
                  <ThumbUpAltOutlinedIcon />
                  <div>3</div>
                </div>
                <div className='grid place-items-center'>
                  <ThumbDownAltOutlinedIcon />
                  <div>8</div>
                </div>
              </div>
            </div>
            <div className='grid place-items-center'>
              <div>친절함</div>
              <div className='grid grid-cols-2'>
                <div className='grid place-items-center'>
                  <ThumbUpAltOutlinedIcon />
                  <div>1</div>
                </div>
                <div className='grid place-items-center'>
                  <ThumbDownAltOutlinedIcon />
                  <div>0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>아직미정</div>
      </div>
    </>
  );
};
export default Review;
