import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DetailScreen from '../screens/Detail/DetailScreen';
import BookingScreen from '../screens/BookingScreen/BookingScreen';
import PayScreen from '../screens/PayScreen/PayScreen';
import FavoriteScreen from '../screens/FavoriteScreen/FavoriteScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import ChooseSlotsScreen from '../screens/ChooseSlotsScreen/ChooseSlotsScreen';
import FilterScreen from '../screens/FilterScreen/FilterScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Booking" component={BookingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PayScreen" component={PayScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChooseSlot" component={ChooseSlotsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Filter" component={FilterScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;