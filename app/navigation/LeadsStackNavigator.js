import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Leads from 'app/screens/Leads';
import LeadsDetails from 'app/screens/Leads/LeadsDetails';

const Stack = createStackNavigator();

function LeadsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Leads" component={Leads} />
      <Stack.Screen name="Lead Details" component={LeadsDetails} />
    </Stack.Navigator>
  );
}

export default LeadsStack;
