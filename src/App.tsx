import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Main from './pages/Main/Main';
import Information from './pages/Information';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/information',
    element: <Information />
  }
]);
const App = () => <RouterProvider router={router} />;

export default App;
