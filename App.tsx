import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FilterSearch from './screens/FilterSearch/FilterSearch';
import UserProfile from './screens/UserProfile/UserProfile';
import MatchesManager from './screens/MatchesManager/MatchesManager';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='FilterSearch'>
        <Stack.Screen name='FilterSearch' component={FilterSearch} />
        <Stack.Screen name='UserProfile' component={UserProfile} />
        <Stack.Screen name='MatchesManager' component={MatchesManager} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
