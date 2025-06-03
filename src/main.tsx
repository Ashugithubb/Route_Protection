import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from "./Component/UserData";
import { store, persistor } from './redux/store.ts';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.tsx';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <UserProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      </UserProvider>
    </BrowserRouter>
);
