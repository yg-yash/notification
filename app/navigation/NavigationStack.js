import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import { useSelector } from 'react-redux';
import AuthStackNavigator from 'app/navigation/AuthStackNavigator';
import AppDrawerNavigator from 'app/navigation/AppDrawerNavigator';
import config from 'app/config/styles';

function App() {
  const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor={config.color.COLOR_PRIMARY} />
      {isLoggedIn ? <AppDrawerNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default App;
