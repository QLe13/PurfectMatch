import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FilterSearch from './screens/FilterSearch/FilterSearch';
import UserProfile from './screens/UserProfile/UserProfile';
import MatchesManager from './screens/MatchesManager/MatchesManager';
import SwipingInterface from './screens/SwipingInterface/SwipingInterface';
import AddPet from './screens/AddPet/AddPet';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import React from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider style={{paddingTop:50}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='AddPet' screenOptions={{headerShown:false}}>
          <Stack.Screen name='FilterSearch' component={FilterSearch}  />
          <Stack.Screen name='UserProfile' component={UserProfile} />
          <Stack.Screen name='MatchesManager' component={MatchesManager} />
          <Stack.Screen name='SwipingInterface' component={SwipingInterface} />
          <Stack.Screen name='AddPet' component={AddPet} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

