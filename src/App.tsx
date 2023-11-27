import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Main from './pages/Main/Main';
import Information from './pages/Information';
import Review from './pages/Review';

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
  }
]);
const App = () => <RouterProvider router={router} />;

export default App;
