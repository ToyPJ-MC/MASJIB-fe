import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Main from './pages/Main/Main';
import Map from './pages/Map';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/masjibmap',
    element: <Map />
  }
]);
const App = () => <RouterProvider router={router} />;

export default App;
