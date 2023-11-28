import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Main from './pages/Main/Main';
import Information from './pages/Information';
import Review from './pages/Review';
import KakaoLogin from './component/KakaoLogin';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/information',
    element: <Information />
  },
  {
    path: '/review/:restaurantname/:address/:x/:y',
    element: <Review />
  },
  {
    path: '/review',
    element: <Review />
  },
  {
    path: '/oauth2/redirect',
    element: <KakaoLogin />
  },
  {
    path: '/profile',
    element: <Profile />
  }
]);
const App = () => <RouterProvider router={router} />;

export default App;
