import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DetailScreen from '../screens/Detail/DetailScreen';
import BookingScreen from '../screens/BookingScreen/BookingScreen';
import PayScreen from '../screens/PayScreen/PayScreen';
import FavoriteScreen from '../screens/FavoriteScreen/FavoriteScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import ChooseSlotsScreen from '../screens/ChooseSlotsScreen/ChooseSlotsScreen';
import FilterScreen from '../screens/FilterScreen/FilterScreen';
import MapScreen from '../screens/MapScreen/MapScreen';
import ReviewScreen from '../screens/Reviews/ReviewScreen';
import ProfileSetting from '../screens/ProfileScreen/ProfileSetting';
import ProfilePatchScreen from '../screens/ProfileScreen/ProfilePatchScreen';
import React from 'react';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Root = () => {
  return (
    <Drawer.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Booking" component={BookingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PayScreen" component={PayScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChooseSlot" component={ChooseSlotsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Filter" component={FilterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Reviews" component={ReviewScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={ProfileSetting} options={{ headerShown: false }} />
        <Stack.Screen name="Patch" component={ProfilePatchScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  )
}

export default Root