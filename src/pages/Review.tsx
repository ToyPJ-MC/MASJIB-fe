import { useParams } from 'react-router-dom';

const Review = () => {
  const urlparams = new URLSearchParams(location.search);
  const params = {
    restaurantname: urlparams.get('restaurantname'),
    address: urlparams.get('address'),
    x: urlparams.get('x'),
    y: urlparams.get('y')
  };
  return (
    <div>
      <div>{params.restaurantname}</div>
      <div>{params.address}</div>
      <div>{params.x}</div>
      <div>{params.y}</div>
    </div>
  );
};
export default Review;
