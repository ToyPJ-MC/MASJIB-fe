import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM
import './styles/global.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import { duration } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <Toaster
      position='top-right'
      reverseOrder={false}
      toastOptions={{
        duration: 3000
      }}
    />
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </RecoilRoot>
);

reportWebVitals();
