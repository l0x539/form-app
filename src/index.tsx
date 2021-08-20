import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CacheProvider } from 'rest-hooks';

ReactDOM.render(
  <React.StrictMode>
    <CacheProvider>
      <Suspense fallback={<div>Loading... </div>}>
        <App />
      </Suspense>
    </CacheProvider>
  </React.StrictMode>,
  document.getElementById('root'));
  
reportWebVitals();
