import axios, { AxiosError, AxiosResponse } from 'axios';
import { SetterOrUpdater } from 'recoil';
import {
  GeolocationType,
  RadiusMarkerType,
  SortingRestaurantType,
  searchImageType
} from '../types';
import { API_URL } from '../Constants/Constants';
import { getCookie, setCookie } from '../util/Cookie';
import jinInterceptor from './jinInterceptor';
import toast from 'react-hot-toast';
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
  await axios
    .get('/v2/local/geo/coord2address.json', {
      headers: {
        ...headerConfig,
        Authorization: `KakaoAK ${process.env.KAKAO_RESTAPI_KEY}`
      },
      params: {
        x: lat,
        y: lon,
        input_coord: 'WGS84'
      }
    })
    .then((res) => {
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
    .get(API_URL + '/oauth/refresh', {
      headers: {
        'Content-Type': 'text/plain',
        withCredentials: true
      },
      params: {
        refreshToken: code
      }
    })
    .then((res) => {
      const accessTokenExpiration = new Date(
        Date.now() + res.data.accessTokenExpiresIn * 10
      );
      const refreshTokenExpiration = new Date(
        Date.now() + res.data.refreshTokenExpiresIn * 6
      );
      setCookie('refresh_token', res.data.refreshToken, {
        expires: refreshTokenExpiration
      });
      setCookie('access_token', res.data.accessToken, {
        expires: accessTokenExpiration
      });
      if (res.data.accessToken) {
        location.href = '/profile';
      }
    })
    .catch((error) => {
      console.log(error);
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
        window.location.href = '/information';
      }
    })
    .catch((err) => {
      console.log(err.response?.data);
    });
};

export const LogoutAPI = async () => {
  await axios
    .post(API_URL + '/oauth/logout')
    .then((res) => {
      console.log('Success');
      console.log(res);
      // if (res.status === 200) {
      //   window.location.href = '/';
      // }
    })
    .catch((err) => {
      console.log('Error');
      console.log(err.response.data);
    });
};

export const RadiusMakerAPI = async (
  address: string,
  x: number,
  y: number,
  setRadiusRestaurant: SetterOrUpdater<RadiusMarkerType>,
  setMarkerAPIStatus: SetterOrUpdater<boolean>
) => {
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
  //console.log('Here=> ' + address, x, y);
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
      //console.log(res);
      setSortingRestaurant([]);
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
