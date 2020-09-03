import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Opportunities from 'app/screens/Opportunities';
import OpportunityDetails from 'app/screens/Opportunities/OpportunityDetails';

const Stack = createStackNavigator();

function OpportunityStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Opportunities" component={Opportunities} />
      <Stack.Screen name="Opportunity Details" component={OpportunityDetails} />
    </Stack.Navigator>
  );
}

export default OpportunityStack;
