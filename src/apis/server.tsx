import axios from 'axios';
import { SetterOrUpdater } from 'recoil';
import { RadiusMarkerType, searchImageType } from '../types';
import { API_URL } from '../Constants/Constants';
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
        input_coord: 'WGS84',
        y: lat,
        x: lon
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
export const LoginAPI = async (code: string) => {
  await axios
    .post('/login', {
      code: code
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const RadiusMakerAPI = async (
  sort: string,
  address: string,
  x: number,
  y: number,
  page: number,
  setRadiusRestaurant: SetterOrUpdater<RadiusMarkerType>
) => {
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
    .then((res) => {
      console.log(res);
      console.log(Object.values(res.data[0]));
      Object.values(res.data[0]).map((item: any) => {
        setRadiusRestaurant((prev) => [
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
            totalRating: item.totalRating
          }
        ]);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
