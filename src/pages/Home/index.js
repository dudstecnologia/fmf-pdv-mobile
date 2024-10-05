import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../../globalStyles';

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={{ padding: 15 }}>
      {/* <Button mode="contained" onPress={() => navigation.navigate('testCamera')}>
        Teste da Câmera
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('testSqlite')}>
        Teste Sqlite
      </Button> */}

      <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('productList')}>
        <Text style={globalStyles.buttonText}>PRODUTOS</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
