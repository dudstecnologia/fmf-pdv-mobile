import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

export default function Home({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView>
        <Button mode="contained" onPress={() => navigation.navigate('testCamera')}>
          Teste da Câmera
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}
