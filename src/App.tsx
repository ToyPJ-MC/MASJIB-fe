import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Main from './pages/Main/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  }
]);
const App = () => <RouterProvider router={router} />;

export default App;
