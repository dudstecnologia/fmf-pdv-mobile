import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import { listProducts } from '../../services/product';

export default function ProductList({ navigation }) {
  const [products, setProducts] = useState([]);

  const loadData = async () => {
    try {
      const productsDb = await listProducts()
      setProducts(productsDb)

      console.log(products)
    } catch (error) {
      // console.error(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <SafeAreaView style={{ padding: 15 }}>
      <ScrollView>
        <Text>Product List</Text>
      </ScrollView>
    </SafeAreaView>
  )
}
