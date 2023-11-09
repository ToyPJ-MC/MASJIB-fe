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

export type { dumyType, SearchType };
