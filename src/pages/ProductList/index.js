import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={{ padding: 15 }}>
      <ScrollView>
        <Text>Product List</Text>
      </ScrollView>
    </SafeAreaView>
  )
}
