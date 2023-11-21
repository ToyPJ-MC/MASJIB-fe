import axios from 'axios';
import { SetterOrUpdater } from 'recoil';
import { searchImageType } from '../types';

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
      console.log(
        res.data.documents[0].road_address.address_name.replace(/[1-9]/g, '')
      );
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
