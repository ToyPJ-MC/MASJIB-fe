import Main from '../pages/Main/Main';
import React from 'react';
import Map from '../pages/Map';
const Router = [
  {
    title: 'Home',
    url: '/',
    component: <Main />
  },
  {
    title: 'MASJIB MAP',
    url: '/masjibmap',
    component: <Map />
  }
];
export default Router;
