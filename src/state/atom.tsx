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
      imageUrl: 'https://ifh.cc/g/X94pgc.jpg',
      category: 'Japanese'
    },
    {
      restaurantname: 'Dumy Restaurant2',
      review: 'This is a dumy review2',
      rating: 4,
      address: 'Dumy Address2',
      imageUrl: 'https://ifh.cc/g/Jx3cOs.jpg',
      category: 'Korean'
    }
  ]
});
const modalState = atom<boolean>({
  key: 'modal',
  default: false
});
const searchState = atom<string>({
  key: 'search',
  default: 'Restaurant'
});

export { dumydataState, modalState, searchState };
