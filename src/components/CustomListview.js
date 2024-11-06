import React from 'react';
import { View, ListView, FlatList, StyleSheet, Text } from 'react-native';
import CustomRow from './CustomRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5
  },
});

const CustomListview = ({ itemList }) => (
  <View style={styles.container}>
    <FlatList
      data={itemList}
      renderItem={({ item }) => <CustomRow
        id={item.id}
        name={item.name}
        price={item.price}
        barcode={item.barcode}
        stock={item.stock}
      />}
    />
  </View>
);

export default CustomListview;
