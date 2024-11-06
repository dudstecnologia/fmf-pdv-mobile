import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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
  row2: {
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
  },
  barcode: {
    fontSize: 18
  },
  stock: {
    fontSize: 18
  }
});

const CustomRow = ({ id, name, price, barcode, stock }) => (
  <View style={styles.container}>
    <View style={styles.row1}>
      <Text style={styles.name}>
        {id} - {name}
      </Text>
      <Text style={styles.price}>
        R$ {price.toFixed(2)}
      </Text>
    </View>
    <View style={styles.row2}>
      <Text style={styles.barcode}>
        Cod Barras: {barcode}
      </Text>
      <Text style={styles.stock}>
        Estoque: {stock}
      </Text>
    </View>
  </View>
);

export default CustomRow;
