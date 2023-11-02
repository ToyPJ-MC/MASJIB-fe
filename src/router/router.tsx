import Main from '../pages/Main/Main';
import React from 'react';
import Information from '../pages/Information';
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
  }
];
export default Router;
