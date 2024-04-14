import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM
import './styles/global.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import reportWebVitals from './reportWebVitals';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // Use ReactDOM.createRoot
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

reportWebVitals();
