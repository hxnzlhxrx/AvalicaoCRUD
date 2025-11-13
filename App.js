// Hansel Hernandez - _gishikoDev

import React, { useEffect, useState } from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SystemUI from 'expo-system-ui';

import LoginScreen from './src/screens/LoginScreen';
import ListUsers from './src/screens/ListUsers';
import UserForm from './src/screens/UserForm';

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('LoginScreen');

  useEffect(() => {
    if (Platform.OS === 'android') {
      SystemUI.setBackgroundColorAsync('#282a36');
    }

    const checkLogin = async () => {
      const logado = await AsyncStorage.getItem('@logado');
      if (logado === 'true') {
        setInitialRoute('ListUsers');
      } else {
        setInitialRoute('LoginScreen');
      }
    };
    checkLogin();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#282a36" barStyle="light-content" />
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: { backgroundColor: '#282a36' },
          headerTintColor: '#f1fa8c',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#282a36' },
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: '' }} />
        <Stack.Screen name="ListUsers" component={ListUsers} options={{ title: '' }} />
        <Stack.Screen name="UserForm" component={UserForm} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
