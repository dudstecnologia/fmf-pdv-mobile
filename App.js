import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from "@rneui/themed";
import { connectDb, createTables } from './src/services/db'

import Home from './src/pages/Home';
import TestCamera from './src/pages/TestCamera';
import TestSqlite from './src/pages/TestSqlite';
import ProductList from './src/pages/ProductList';

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
  const initDb = async () => {
    try {
      const db = await connectDb()
      await createTables(db)
    } catch (error) {
      console.log('Erro initDb')
      console.error(error)
    }
  }

  useEffect(() => {
    initDb()
  }, [initDb])

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0D47A1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
        >
        <Stack.Screen name="home" component={ Home } options={{ title: 'Tela Inicial' }} />
        <Stack.Screen name="testCamera" component={ TestCamera } options={{ title: 'Teste da Câmera' }} />
        <Stack.Screen name="testSqlite" component={ TestSqlite } options={{ title: 'Teste do Sqlite' }} />
        <Stack.Screen
          name="productList"
          component={ ProductList }
          options={({ navigation }) => {
            return {
                title: 'Lista de Usuários',
                headerRight: () => (
                    <Button
                        type="clear"
                        icon={<Icon name="add" size={25} color="white" />}
                        onPress={() => navigation.navigate('productForm')}
                    />
                )
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
