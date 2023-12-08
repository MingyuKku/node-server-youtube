import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './_reducers';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

import './index.css';
import App from './App';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)


// const theme = createTheme();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={ store }>
      {/* <ThemeProvider theme={theme}> */}
        <App />
      {/* </ThemeProvider> */}
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
