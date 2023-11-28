import Main from '../pages/Main/Main';
import React from 'react';
import Information from '../pages/Information';
import Review from '../pages/Review';
import KakaoLogin from '../component/KakaoLogin';
import Profile from '../pages/Profile';

const Router = [
  {
    title: 'Home',
    url: '/',
    component: <Main />
  },
  {
    title: 'MASJIB Information',
    url: '/information',
    component: <Information />
  },
  {
    url: '/review/:restaurantname/:address/:x/:y',
    component: <Review />
  },
  {
    url: '/review',
    component: <Review />
  },
  {
    url: '/KakaoLogin',
    component: <KakaoLogin />
  },
  {
    title: '프로필',
    url: '/profile',
    component: <Profile />
  }
];
export default Router;
