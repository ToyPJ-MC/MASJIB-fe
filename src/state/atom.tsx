import { atom } from 'recoil';
import {
  GeolocationType,
  MemberReviewListType,
  RadiusMarkerType,
  RestaurantDetailType,
  SearchResultType,
  SortingRestaurantType,
  dumyType,
  searchImageType
} from '../types';

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
const loginmodalState = atom<boolean>({
  key: 'loginmodal',
  default: false
});
const searchImageState = atom<searchImageType>({
  key: 'searchImage',
  default: []
});
const writemodalState = atom<boolean>({
  key: 'writemodal',
  default: false
});
const RadiusMarkerDataState = atom<RadiusMarkerType>({
  key: 'RadiusMarkerDataState',
  default: []
});
const RadiusSortState = atom<string>({
  key: 'RadiusSortState',
  default: 'rating'
});
const RadiusMarkerAPIStatus = atom<boolean>({
  key: 'RadiusMarkerAPIStatus',
  default: false
});
const SortingRestaurantDataState = atom<SortingRestaurantType>({
  key: 'SortingRestaurantType',
  default: []
});
const GeolocationDataState = atom<GeolocationType>({
  key: 'GeolocationDataState',
  default: {
    latitude: 0,
    longitude: 0
  }
});
const m_SearchModalState = atom<boolean>({
  key: 'm_SearchModalState',
  default: false
});
const logoutstate = atom<boolean>({
  key: 'logoutstate',
  default: false
});
const serverstatus = atom<string>({
  key: 'server',
  default: ''
});
const nicknameStatus = atom<number>({
  key: 'nickname',
  default: 0
});
const MemberReviewListState = atom<MemberReviewListType>({
  key: 'MemberReviewListState',
  default: []
});
const RestaurantReviewListState = atom<RestaurantDetailType | null>({
  key: 'RestaurantReviewListState',
  default: null
});
const SearchResultState = atom<SearchResultType>({
  key: 'SearchResultState',
  default: []
});
const SearchModalState = atom<boolean>({
  key: 'SearchModalState',
  default: false
});
export {
  dumydataState,
  modalState,
  loginmodalState,
  searchImageState,
  writemodalState,
  RadiusMarkerDataState,
  RadiusSortState,
  RadiusMarkerAPIStatus,
  SortingRestaurantDataState,
  GeolocationDataState,
  m_SearchModalState,
  logoutstate,
  serverstatus,
  nicknameStatus,
  MemberReviewListState,
  RestaurantReviewListState,
  SearchResultState,
  SearchModalState
};
