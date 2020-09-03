import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LeadsStack from './LeadsStackNavigator';
import Dashboard from 'app/screens/Dashboard';
import CustomDrawerContent from 'app/navigation/CustomDrawer';
import OpportunityStack from './OpportunityStack';
import AddLeads from 'app/screens/Leads/AddLeads';

const Drawer = createDrawerNavigator();

function AppDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="Dashboard">
      <Drawer.Screen name="Leads" component={LeadsStack} />
      <Drawer.Screen name="Opportunities" component={OpportunityStack} />
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Add Leads" component={AddLeads} />
    </Drawer.Navigator>
  );
}

export default AppDrawerNavigator;
