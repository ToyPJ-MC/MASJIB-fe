import Main from '../pages/Main/Main';
import React from 'react';
import Information from '../pages/Information';
import Review from '../pages/Review';

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
  }
];
export default Router;
