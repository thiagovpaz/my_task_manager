import { StatusBar } from 'expo-status-bar';

import { MainNavigation } from './navigation';

const App = () => {
  return (
    <>
      <MainNavigation />

      <StatusBar style="auto" />
    </>
  );
};

export { App };
