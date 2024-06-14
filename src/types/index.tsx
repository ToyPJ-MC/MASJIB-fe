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
type MemberReviewListType = {
  shopId: number;
  shopName: string;
  reviewId: number;
  comment: string;
  rating: number;
  taste: string;
  hygiene: string;
  kindness: string;
  createTime: string;
  paths: string[]; // image
}[];
type RestaurantDetailType = {
  shopId: number;
  shopName: string;
  address: string;
  x: number;
  y: number;
  kind: string;
  status: string;
  image: string;
  recentReview: string;
  reviewCount: number;
  followCount: number;
  totalRating: number;
  rating: {
    five: number;
    fourHalf: number;
    four: number;
    threeHalf: number;
    three: number;
    twoHalf: number;
    two: number;
    oneHalf: number;
    one: number;
    half: number;
    zero: number;
    count: number;
  };
  assessment: {
    goodTaste: number;
    badTaste: number;
    goodHygiene: number;
    badHygiene: number;
    kindness: number;
    unKindness: number;
  };
  reviews: {
    id: number;
    comment: string;
    createTime: string;
    rating: number;
    taste: string;
    hygiene: string;
    kindness: string;
  }[];
  totalPage: number;
};

export type {
  dumyType,
  SearchType,
  searchImageType,
  RadiusMarkerType,
  SortingRestaurantType,
  GeolocationType,
  MemberReviewListType,
  RestaurantDetailType
};
