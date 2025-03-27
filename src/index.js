import React from 'react';
import { createRoot } from 'react-dom/client'; // Изменяем импорт
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import './styles/global.scss';

const container = document.getElementById('root');
const root = createRoot(container); // Создаём корневой элемент

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
