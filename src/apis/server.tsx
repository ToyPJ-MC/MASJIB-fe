import axios, { AxiosError, AxiosResponse } from 'axios';
import { SetterOrUpdater } from 'recoil';
import {
  RadiusMarkerType,
  SortingRestaurantType,
  searchImageType
} from '../types';
import { API_URL } from '../Constants/Constants';
import { setCookie } from '../util/Cookie';
const headerConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};
export const BlogSearchAPI = async (
  search: string,
  setBlog: SetterOrUpdater<searchImageType>
) => {
  await axios
    .get('/v2/search/image', {
      headers: {
        ...headerConfig,
        Authorization: `KakaoAK ${process.env.KAKAO_RESTAPI_KEY}`
      },
      params: {
        sort: 'accuracy',
        page: 1,
        size: 30,
        query: search
      }
    })
    .then((res) => {
      console.log(res);
      res.data.documents.map((item: any) => {
        setBlog((prev) => [
          ...prev,
          { imageUrl: item.thumbnail_url, doc_url: item.doc_url }
        ]);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const AddressAPI = async (
  lat: number,
  lon: number,
  setAddress: SetterOrUpdater<string>
) => {
  console.log('위도,경도 ' + lat, lon);
  await axios
    .get('/v2/local/geo/coord2address.json', {
      headers: {
        ...headerConfig,
        Authorization: `KakaoAK ${process.env.KAKAO_RESTAPI_KEY}`
      },
      params: {
        input_coord: 'WGS84',
        x: lat,
        y: lon
      }
    })
    .then((res) => {
      console.log(res);
      setAddress(
        res.data.documents[0].road_address.address_name.replace(/[1-9]/g, '')
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
export const RefreshTokenAPI = async (code: string) => {
  await axios
    .post(API_URL + '/login', {
      code: code
    })
    .then((res) => {
      console.log(res);
      setCookie('access_token', res.data.accessToken, { path: '/' });
      setCookie('refresh_token', res.data.refreshToken, { path: '/' });
      if (res.data.accessToken) {
        window.location.href = '/profile';
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const LoginAPI = async (refreshtoken: string, nickname: string) => {
  await axios
    .post(API_URL + '/login', null, {
      params: { nickname: nickname },
      headers: {
        Authorization: `Bearer ${refreshtoken}`
      }
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        window.location.href = '/';
      }
    })
    .catch((err) => {
      console.log(err.response?.data);
    });
};
export const RadiusMakerAPI = async (
  address: string,
  x: number,
  y: number,
  setRadiusRestaurant: SetterOrUpdater<RadiusMarkerType>,
  setMarkerAPIStatus: SetterOrUpdater<boolean>
) => {
  console.log(address, x, y);
  axios
    .get(API_URL + '/shop/radius/all', {
      params: {
        address: address,
        x: x,
        y: y
      },
      headers: headerConfig
    })
    .then(async (res: AxiosResponse) => {
      console.log(res);
      if (res.status === 200) {
        setMarkerAPIStatus(true);
      }
      console.log(res.data);
      setRadiusRestaurant(res.data);
    })
    .catch((err: AxiosError) => {
      console.log(err.response?.data);
      if (err.response?.status === 400) {
        setMarkerAPIStatus(false);
      }
    });
};
export const SortingRestaurantAPI = async (
  address: string,
  x: number,
  y: number,
  sort: string,
  page: number,
  setSortingRestaurant: SetterOrUpdater<SortingRestaurantType>
) => {
  console.log('Here=> ' + address, x, y);
  axios
    .get(API_URL + '/shop/radius', {
      params: {
        sort: sort,
        address: address,
        x: x,
        y: y,
        page: page
      },
      headers: headerConfig
    })
    .then(async (res: AxiosResponse) => {
      console.log(res);
      Object.values(res.data[0]).map((item: any) => {
        setSortingRestaurant((prev) => [
          ...prev,
          {
            name: item.name,
            address: item.address,
            x: item.x,
            y: item.y,
            kind: item.kind,
            image: item.image,
            recentReview: item.recentReview,
            reviewCount: item.reviewCount,
            followCount: item.followCount,
            totalRating: item.totalRating,
            shopId: item.shopId
          }
        ]);
      });
    })
    .catch((err: AxiosError) => {
      console.log(err.response?.data);
    });
};
