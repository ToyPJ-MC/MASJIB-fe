import { atom } from 'recoil';
import { SearchType, dumyType, searchImageType } from '../types';

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
const loginmodalState = atom<boolean>({
  key: 'loginmodal',
  default: false
});
const searchResultState = atom<SearchType>({
  key: 'searchResult',
  default: []
});
const searchImageState = atom<searchImageType>({
  key: 'searchImage',
  default: []
});

export {
  dumydataState,
  modalState,
  searchState,
  searchResultState,
  loginmodalState,
  searchImageState
};
