import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import { Provider } from 'react-redux';

import { MainNavigation } from './navigation';
import { theme } from './styles/theme';
import { store, reduxStore } from './store/redux-store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={reduxStore} loading={null}>
        <ThemeProvider theme={theme}>
          <MainNavigation />

          <StatusBar style="auto" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export { App };
