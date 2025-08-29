import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import { MainNavigation } from './navigation';
import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainNavigation />

      <StatusBar style="auto" />
    </ThemeProvider>
  );
};

export { App };
