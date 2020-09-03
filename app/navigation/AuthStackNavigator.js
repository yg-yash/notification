import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from 'app/screens/Login';
import ForgetPassword from 'app/screens/ForgetPassword';

const Stack = createStackNavigator();

const AuthStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Sign In" component={Login} />
    <Stack.Screen name="Forget" component={ForgetPassword} />
  </Stack.Navigator>
);

export default AuthStackNavigator;
