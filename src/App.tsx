import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './pages/Main/Main';
import Information from './pages/Information';
import Review from './pages/Review';
import KakaoLogin from './component/KakaoLogin';
import Profile from './pages/Profile';
import Errorpage from './pages/Errorpage';
import M_Information from './pages/M_Information';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/information',
    element: <Information />
  },
  // {
  //   path: '/review/:restaurantname/:address/:x/:y',
  //   element: <Review />
  // },
  {
    path: '/review',
    element: <Review />
  },
  {
    path: '*',
    element: <Errorpage />
  },
  {
    path: '/oauth2/redirect',
    element: <KakaoLogin />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/m_information',
    element: <M_Information />
  }
]);

const App = () => <RouterProvider router={router} />;

export default App;
