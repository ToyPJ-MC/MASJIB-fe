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
      res.data.documents.map((item: any) => {
        setBlog((prev) => [...prev, item.thumbnail_url]);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};