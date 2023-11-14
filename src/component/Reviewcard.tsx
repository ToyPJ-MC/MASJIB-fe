import {
  Card,
  Rating,
  Typography
} from '@mui/material';
import { Button } from 'evergreen-ui';
interface ReviewcardProps {
  review: string;
  rating: number;
  restaurantname: string;
  address: string;
  category: string;
  imageUrl: string;
}
const Reviewcard = (props: ReviewcardProps) => {
  return (
    <Card className='min-w-full hover:border'>
      <div className='grid grid-cols-2 w-fit'>
        <div className='w-48'>
          <img
            src={props.imageUrl}
            alt={props.restaurantname}
            className='w-48 h-48'
          />
        </div>
        <div>
          <div className='text-2xl font-bold'>{props.restaurantname}</div>
          <div>
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
          <Typography variant='body2' color='text.secondary'>
            {props.review}
          </Typography>
        </div>
      </div>
    </Card>
  );
};
export default Reviewcard;
