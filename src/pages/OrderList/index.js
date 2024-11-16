import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, View } from 'react-native';
import { listOrders } from '../../services/order';

export default function OrderList({ navigation }) {
  const [orders, setOrders] = useState([]);

  const loadData = async () => {
    try {
      const ordersDb = await listOrders()
      setOrders(ordersDb)
    } catch (error) {
      // console.error(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <View style={styles.container}>
        <View style={styles.row1}>
          <Text style={styles.name}>
            Data: {item.date}
          </Text>
          <Text style={styles.price}>
            Total: {item.total.toFixed(2)}
          </Text>
        </View>
      </View>}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    marginLeft:15,
    marginRight:15,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  row1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  price: {
    fontSize: 18,
    color: 'blue',
  }
});
