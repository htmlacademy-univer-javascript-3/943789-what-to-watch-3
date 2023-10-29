import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { MockFilmManager } from './mocks/film';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App filmManager={new MockFilmManager}/>
  </React.StrictMode>
);
