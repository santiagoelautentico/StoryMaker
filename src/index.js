import React from 'react';
import ReactDOM  from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import esLocaleData from 'react-intl/locale-data/es';
import ptLocaleData from 'react-intl/locale-data/pt';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
addLocaleData(enLocaleData);
addLocaleData(esLocaleData);
addLocaleData(ptLocaleData);

ReactDOM.render(
  <IntlProvider locale='en' >
    <BrowserRouter>
      <App />
    </BrowserRouter>
</IntlProvider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
