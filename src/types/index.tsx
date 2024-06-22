type dumyType = {
  restaurantname: string;
  review: string;
  rating: number;
  address: string;
  imageUrl: string;
  category: string;
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
type RatingType = {
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

type AssessmentType = {
  goodTaste: number;
  badTaste: number;
  goodHygiene: number;
  badHygiene: number;
  kindness: number;
  unKindness: number;
};

type RestaurantType = {
  id: number;
  name: string;
  x: number;
  y: number;
  address: string;
  status: string;
  reviewCount: number;
  followCount: number;
  kind: string;
  rating: RatingType;
  assessment: AssessmentType;
};

type ReviewType = {
  id: number;
  comment: string;
  createTime: string;
  rating: number;
  taste: string;
  hygiene: string;
  kindness: string;
};

type ReviewWithImageType = {
  review: ReviewType;
  imagePath: string[];
};

type RestaurantDetailType = {
  restaurant: RestaurantType;
  shopImages: string[];
  reviews: ReviewWithImageType[];
  totalPage: number;
  totalRating: number;
};
type SearchResultType = {
  id: number;
  name: string;
  address: string;
  kind: string;
}[];

export type {
  dumyType,
  searchImageType,
  RadiusMarkerType,
  SortingRestaurantType,
  GeolocationType,
  MemberReviewListType,
  RestaurantDetailType,
  SearchResultType,
  RatingType,
  AssessmentType,
  RestaurantType,
  ReviewType,
  ReviewWithImageType
};
