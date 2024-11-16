import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, View, Dimensions } from 'react-native';
import { listOrders, bestSellingProducts } from '../../services/order';
import { PieChart } from "react-native-chart-kit";
const { width }  = Dimensions.get('window');

export default function OrderList({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [ordersChart, setOrdersChart] = useState([]);

  const loadData = async () => {
    try {
      const ordersDb = await listOrders()
      setOrders(ordersDb)
    } catch (error) {
      // console.error(error)
    }
  }

  const loadChart = async () => {
    try {
      const ordersChartDb = await bestSellingProducts()
      const colors = ['blue', 'green', 'magenta', 'orange', 'red']

      const or = ordersChartDb.map((o, i) => {
        o.color = colors[i]
        o.legendFontColor = '#000'
        o.legendFontSize = 15
        return o
      })

      setOrdersChart(or)
    } catch (error) {
      // console.error(error)
    }
  }

  useEffect(() => {
    loadData()
    loadChart()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PieChart
        data={ordersChart}
        width={width - 10}
        height={250}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        accessor={"total"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[0, 0]}
        // absolute
      />

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
