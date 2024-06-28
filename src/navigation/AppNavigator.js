import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DashboardNavigator from './DashboardNavigator';
import AuthNavigator from './AuthNavigator';
import { getData } from '../helpers/storeHelper';

const AppNavigator = () => {
  const token = getData('token');

  return (
    <NavigationContainer>
      { token ? <DashboardNavigator/> : <AuthNavigator/> }
    </NavigationContainer>
  );
};

export default AppNavigator;