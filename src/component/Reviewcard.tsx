import { Card, CardContent, CardMedia, Typography } from '@mui/material';
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
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component='img'
        height='10'
        image={props.imageUrl}
        alt={props.restaurantname}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.restaurantname}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {props.review}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default Reviewcard;
