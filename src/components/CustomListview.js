import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, RefreshControl } from 'react-native';
import CustomRow from './CustomRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5
  },
});

const CustomListview = ({ itemList, updateList }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    updateList()
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={itemList}
        renderItem={({ item }) => <CustomRow
          product={item}
        />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  )
};

export default CustomListview;
