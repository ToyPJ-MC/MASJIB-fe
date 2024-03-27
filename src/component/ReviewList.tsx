import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
const ReviewList = () => {
  return (
    <div>
      <div>이름</div>
      <div className='grid grid-cols-2 w-fit'>
        <div className='grid place-items-center'>
          <Rating
            name='half-rating'
            defaultValue={3.5}
            precision={0.5}
            readOnly
            size='large'
            emptyIcon={<StarIcon className='text-gray-300' fontSize='small' />}
          />
        </div>
        <div className='text-sm font-medium grid items-cente'>몇 월 몇 일</div>
      </div>
      <div>글</div>
    </div>
  );
};
export default ReviewList;
