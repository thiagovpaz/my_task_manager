import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { HomeScreen } from '../screens/home';
import { ManageTaskScreen } from '../screens/manage-task';

const Main = createNativeStackNavigator();

export type MainStackParamList = {
  HomeScreen: undefined;
  ManageTaskScreen: { id?: string };
};

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Main.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          presentation: 'card',
        }}
      >
        <Main.Screen name="HomeScreen" component={HomeScreen} />
        <Main.Screen name="ManageTaskScreen" component={ManageTaskScreen} />
      </Main.Navigator>
    </NavigationContainer>
  );
};

export { MainNavigation };
