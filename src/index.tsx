import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './Root';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { router } from './routing/router';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter> */}
        <RouterProvider router={router} />
      {/* </BrowserRouter> */}
    </Provider>
  </React.StrictMode>
);
