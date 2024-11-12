import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
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

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('orderNew')}>
        <Text style={globalStyles.buttonText}>INICIAR VENDA</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('productList')}>
        <Text style={globalStyles.buttonText}>PRODUTOS</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    ...globalStyles.button,
    marginBottom: 15
  }
});
