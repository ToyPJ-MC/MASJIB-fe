import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM
import './styles/global.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </RecoilRoot>
);

reportWebVitals();
