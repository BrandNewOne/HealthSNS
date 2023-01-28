import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import store from './store';
//import { PersistGate } from 'redux-persist/integration/react';
// import store, {persistor} from './store';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
  <CookiesProvider>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
      {/* </PersistGate> */}
    </Provider>
  </CookiesProvider>,
);
