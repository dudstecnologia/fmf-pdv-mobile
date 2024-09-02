import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/pages/Home';
import TestCamera from './src/pages/TestCamera';
import TestSqlite from './src/pages/TestSqlite';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#00796B',
    // background: '#fff',
    // text: '#00796B'
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={ Home } options={{ title: 'Tela Inicial' }} />
        <Stack.Screen name="testCamera" component={ TestCamera } options={{ title: 'Teste da Câmera' }} />
        <Stack.Screen name="testSqlite" component={ TestSqlite } options={{ title: 'Teste do Sqlite' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}