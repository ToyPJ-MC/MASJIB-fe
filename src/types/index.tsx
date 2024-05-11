type dumyType = {
  restaurantname: string;
  review: string;
  rating: number;
  address: string;
  imageUrl: string;
  category: string;
}[];
type SearchType = {
  phone: string;
  place_name: string;
  road_address_name: string;
}[];
type searchImageType = {
  imageUrl: string;
  doc_url: string;
}[];
type RadiusMarkerType = {
  name: string;
  address: string;
  x: number;
  y: number;
  kind: string;
  image: string;
  shopId: number;
  totalRating: number;
}[];
type SortingRestaurantType = {
  name: string;
  address: string;
  x: number;
  y: number;
  kind: string;
  image: string;
  recentReview: string;
  reviewCount: number;
  followCount: number;
  totalRating: number;
  shopId: number;
}[];
type GeolocationType = {
  latitude: number;
  longitude: number;
};

export type {
  dumyType,
  SearchType,
  searchImageType,
  RadiusMarkerType,
  SortingRestaurantType,
  GeolocationType
};
