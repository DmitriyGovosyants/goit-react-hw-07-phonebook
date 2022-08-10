import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import { App } from 'components';

import 'modern-normalize';
import { Global, ThemeProvider } from '@emotion/react';
import { GlobalStyles, theme } from 'styles';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyles} />
        <ToastContainer />
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
