import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

const CustomRow = ({ product }) => {
  const navigation = useNavigation();

  const clickProduct = (p) => {
    navigation.navigate('productForm', { product: p })
  }

  return (
    <TouchableOpacity onPress={() => clickProduct(product)}>
      <View style={styles.container}>
        <View style={styles.row1}>
          <Text style={styles.name}>
            {product.id} - {product.name}
          </Text>
          <Text style={styles.price}>
            R$ {product.price.toFixed(2)}
          </Text>
        </View>
        <View style={styles.row2}>
          <Text style={styles.barcode}>
            Cod Barras: {product.barcode}
          </Text>
          <Text style={styles.stock}>
            Estoque: {product.stock}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CustomRow;
