import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { MockFilmManager } from './mocks/film';
import { Provider } from 'react-redux';
import { filterGenreStore } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={filterGenreStore}>
      <App filmManager={new MockFilmManager}/>
    </Provider>
  </React.StrictMode>
);
