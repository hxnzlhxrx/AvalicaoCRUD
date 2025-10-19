// Hansel Hernandez - _gishikoDev

import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListUsers from './src/screens/ListUsers';
import UserForm from './src/screens/UserForm';
import * as SystemUI from 'expo-system-ui';

const Stack = createStackNavigator();

export default function App() {
 
  useEffect(() => {
    if (Platform.OS === 'android') {
      SystemUI.setBackgroundColorAsync('#282a36');
    }
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#282a36" barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="ListUsers"
        screenOptions={{
          headerStyle: { backgroundColor: '#282a36' },
          headerTintColor: '#f1fa8c',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#282a36' },
        }}
      >
        <Stack.Screen
          name="ListUsers"
          component={ListUsers}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="UserForm"
          component={UserForm}
          options={{ title: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
