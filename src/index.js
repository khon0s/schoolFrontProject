import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Helmet, HelmetProvider } from 'react-helmet-async';

ReactDOM.render(
  <React.StrictMode>
     <HelmetProvider>
    <App>
      <Helmet>
        <title>Néstor Almarza</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <h1>Néstor Almarza</h1>
    </App>
  </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
