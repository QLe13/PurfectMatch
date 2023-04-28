import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FilterSearch from './screens/FilterSearch/FilterSearch';
import UserProfile from './screens/UserProfile/UserProfile';
import MatchesManager from './screens/MatchesManager/MatchesManager';
import PetManager from './screens/PetManager/PetManager';
import PetProfile from './screens/PetProfile/PetProfile';
import SwipingInterface from './screens/SwipingInterface/SwipingInterface';
import AddPet from './screens/AddPet/AddPet';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import React from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider style={{ paddingTop: 50 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='FilterSearch' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='FilterSearch' component={FilterSearch} options={{ presentation: 'containedModal' }} />
          <Stack.Screen name='UserProfile' component={UserProfile} options={{ presentation: 'modal' }} />
          <Stack.Screen name='MatchesManager' component={MatchesManager} options={{ presentation: 'modal' }} />
          <Stack.Screen name='SwipingInterface' component={SwipingInterface} options={{ presentation: 'containedModal' }} />
          <Stack.Screen name='AddPet' component={AddPet} options={{ presentation: 'modal' }} />
          <Stack.Screen name='PetManager' component={PetManager} options={{ presentation: 'modal' }} />
          <Stack.Screen name='PetProfile' component={PetProfile} options={{ presentation: 'modal' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

