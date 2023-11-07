import { atom } from 'recoil';
import { dumyType } from '../types';

const dumydataState = atom<dumyType>({
  key: 'dumydata',
  default: [
    {
      restaurantname: 'Dumy Restaurant1',
      review: 'This is a dumy review1',
      rating: 3.5,
      address: 'Dumy Address1',
      imageUrl: '../assets/pic1.jpeg',
      category: 'Japanese'
    },
    {
      restaurantname: 'Dumy Restaurant2',
      review: 'This is a dumy review2',
      rating: 4,
      address: 'Dumy Address2',
      imageUrl: '../assets/pic2.jpeg',
      category: 'Korean'
    }
  ]
});

export { dumydataState };
