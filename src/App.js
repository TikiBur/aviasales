import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { useSelector } from 'react-redux';
import Filters from './components/Filters';
import Sorting from './components/Sorting';
import TicketList from './components/TicketList';
import styles from './styles/App.module.scss';
import logoStyles from './styles/Logo.module.scss';
import Logo from './image/Logo.png';

function App() {
  const filters = useSelector((state) => state.filters);
  console.log('Redux state:', filters);

  return (
    <Provider store={store}>
      <div className={styles.app}>
        <div className={logoStyles.logo}>
          <img src={Logo} alt="Aviasales Logo" />
        </div>
        <div className={styles.container}>
          <Filters />
          <div className={styles.main}>
            <Sorting />
            <TicketList />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
