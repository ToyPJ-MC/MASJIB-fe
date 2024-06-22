import axios, { AxiosError, AxiosResponse } from 'axios';
import { SetterOrUpdater } from 'recoil';
import {
  MemberReviewListType,
  RadiusMarkerType,
  RestaurantDetailType,
  SearchResultType,
  SortingRestaurantType,
  searchImageType
} from '../types';
import { API_URL } from '../Constants/Constants';
import { getCookie, removeCookie, setCookie } from '../util/Cookie';
import jinInterceptor from './jinInterceptor';
const headerConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
};
const width = window.innerWidth;
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

export const RefreshTokenAPI = async (code: string) => {
  await jinInterceptor
    .get(API_URL + '/oauth/refresh', {
      headers: headerConfig,
      withCredentials: true,
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
      if (res.data.accessToken && getCookie('nickname') === undefined) {
        location.href = '/profile';
      }
      if (res.data.accessToken && getCookie('nickname') !== undefined) {
        location.href = '/information';
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
      //console.log(res);
      if (res.status === 200) {
        setCookie('loginstatus', 'success');
        window.location.href = '/information';
      }
    })
    .catch((err) => {
      console.log(err.response?.data);
    });
};

export const LogoutAPI = async (setLogout: SetterOrUpdater<boolean>) => {
  await jinInterceptor
    .post(
      API_URL + '/oauth/logout',
      {},
      {
        withCredentials: true,
        headers: {
          ...headerConfig,
          Authorization: `Bearer ${getCookie('access_token')}`
        }
      }
    )
    .then((res) => {
      res.status === 200 && width < 450
        ? (window.location.href = '/m_information')
        : res.status === 200 &&
          width > 450 &&
          (window.location.href = '/information');
      res.status === 200 &&
        (removeCookie('access_token'),
        removeCookie('refresh_token'),
        setLogout(true));
    })
    .catch((err) => {
      console.log('Error');
      console.log(err.response.data);
    });
};

export const RadiusMakerAPI = async (
  x: number,
  y: number,
  setRadiusRestaurant: SetterOrUpdater<RadiusMarkerType>,
  setMarkerAPIStatus: SetterOrUpdater<boolean>
) => {
  axios
    .get(API_URL + '/shop/radius/all', {
      params: {
        x: x,
        y: y
      },
      headers: headerConfig
    })
    .then(async (res: AxiosResponse) => {
      //console.log(res);
      if (res.status === 200) {
        setMarkerAPIStatus(true);
      }
      setRadiusRestaurant(res.data);
    })
    .catch((err: AxiosError) => {
      console.log(err);
      if (err.response?.status === 400) {
        setMarkerAPIStatus(false);
      }
    });
};
export const SortingRestaurantAPI = async (
  x: number,
  y: number,
  sort: string,
  page: number,
  setSortingRestaurant: SetterOrUpdater<SortingRestaurantType>
) => {
  axios
    .get(API_URL + '/shop/radius', {
      params: {
        sort: sort,
        x: x,
        y: y,
        page: page
      },
      headers: headerConfig
    })
    .then(async (res: AxiosResponse) => {
      console.log(res);
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
      console.log(err);
    });
};
export const ServerStatusAPI = async (setStatus: SetterOrUpdater<string>) => {
  await axios
    .get(API_URL + '/ping', {
      headers: headerConfig
    })
    .then((res) => {
      if (res.status === 500) {
        setStatus('Server Error');
      }
    })
    .catch((err) => {
      if (err.message === 'Network Error') {
        setStatus('Server Error');
      }
    });
};
export const NicknameAPI = async (setNickname: SetterOrUpdater<string>) => {
  await jinInterceptor
    .get(API_URL + '/members/info', {
      headers: {
        ...headerConfig,
        Authorization: `Bearer ${getCookie('access_token')}`
      }
    })
    .then((res) => {
      setNickname(res.data);
      if (!res.data.match(/@\w+/g)) {
        setCookie('nickname', res.data);
      }
    })
    .catch((err) => {
      console.log(err.response?.data);
    });
};

export const NicknameChangeAPI = async (
  nickname: string,
  setNicknameStatus: SetterOrUpdater<number>
) => {
  await jinInterceptor
    .post(
      API_URL + `/members/${nickname}`,
      { nickname: nickname },
      {
        headers: {
          ...headerConfig,
          Authorization: `Bearer ${getCookie('access_token')}`
        }
      }
    )
    .then((res) => {
      if (res.status === 200) {
        setNicknameStatus(200);
      }
    })
    .catch((err) => {
      if (err.status === 400) {
        setNicknameStatus(400);
      }
    });
};
export const WriteReviewAPI = async (
  comment: string,
  shopId: number,
  rating: number,
  taste: string,
  hygiene: string,
  kindness: string,
  files: File[]
) => {
  await jinInterceptor
    .post(
      API_URL + '/review',
      {
        comment: comment,
        shopId: shopId,
        rating: rating,
        taste: taste,
        hygiene: hygiene,
        kindness: kindness,
        files: files
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          Authorization: `Bearer ${getCookie('access_token')}`
        }
      }
    )
    .then((res) => {
      if (res.status === 200) {
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log(err.response?.data);
    });
};
export const MemberReviewAPI = async (
  setMemberReview: SetterOrUpdater<MemberReviewListType>
) => {
  await jinInterceptor
    .get(API_URL + '/review', {
      headers: {
        ...headerConfig,
        Authorization: `Bearer ${getCookie('access_token')}`
      }
    })
    .then((res) => {
      console.log(res);
      setMemberReview(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const DeleteMemberReviewAPI = async (reviewId: number) => {
  await jinInterceptor
    .delete(API_URL + '/review', {
      params: {
        ids: reviewId
      },
      headers: {
        ...headerConfig,
        Authorization: `Bearer ${getCookie('access_token')}`
      }
    })
    .then((res) => {
      if (res.status === 200) {
        window.location.reload();
        setCookie('deletestatus', 'success');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const RestaurantDetailAPI = async (
  shopId: number,
  sortType: string,
  reviewType: string,
  page: number,
  setDetail: SetterOrUpdater<RestaurantDetailType | null>
) => {
  await jinInterceptor
    .get(API_URL + `/shop/${shopId}`, {
      params: {
        sortType: sortType,
        reviewType: reviewType,
        page: page
      },
      headers: headerConfig
    })
    .then((response) => {
      console.log(response);
      const data = response.data;
      const restaurantDetail: RestaurantDetailType = {
        restaurant: {
          id: data[0].id,
          name: data[0].name,
          address: data[0].address,
          x: data[0].x,
          y: data[0].y,
          status: data[0].status,
          reviewCount: data[0].reviewCount,
          followCount: data[0].followCount,
          kind: data[0].kind,
          rating: {
            five: data[0].rating.five,
            fourHalf: data[0].rating.fourHalf,
            four: data[0].rating.four,
            threeHalf: data[0].rating.threeHalf,
            three: data[0].rating.three,
            twoHalf: data[0].rating.twoHalf,
            two: data[0].rating.two,
            oneHalf: data[0].rating.oneHalf,
            one: data[0].rating.one,
            half: data[0].rating.half,
            zero: data[0].rating.zero,
            count: data[0].rating.count
          },
          assessment: {
            goodTaste: data[0].assessment.goodTaste,
            badTaste: data[0].assessment.badTaste,
            goodHygiene: data[0].assessment.goodHygiene,
            badHygiene: data[0].assessment.badHygiene,
            kindness: data[0].assessment.kindness,
            unKindness: data[0].assessment.unKindness
          }
        },
        shopImages: data[1].shop_images,
        reviews: data[2].map((item: any) => ({
          review: {
            id: item.review.id,
            comment: item.review.comment,
            createTime: item.review.createTime,
            rating: item.review.rating,
            taste: item.review.taste,
            hygiene: item.review.hygiene,
            kindness: item.review.kindness
          },
          imagePath: item.imagePath
        })),
        totalPage: data[3].totalPage,
        totalRating: data[4].totalRating
      };
      setDetail(restaurantDetail);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const SearchAPI = async (
  keyword: string,
  setSearchResult: SetterOrUpdater<SearchResultType>
) => {
  await axios
    .get(API_URL + '/es/shop', {
      params: {
        keyword: keyword
      },
      headers: headerConfig
    })
    .then((res) => {
      console.log(res);
      setSearchResult(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const RestaurantImagesAPI = async (
  shopId: number,
  setImages: SetterOrUpdater<string[]>
) => {
  await axios
    .get(API_URL + `/shop/${shopId}/images`, {
      headers: headerConfig
    })
    .then((res) => {
      //console.log(res);
      setImages(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
