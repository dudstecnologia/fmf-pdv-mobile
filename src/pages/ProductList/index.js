import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import { listProducts } from '../../services/product';
import CustomListview from '../../components/CustomListview';

export default function ProductList({ navigation }) {
  const [products, setProducts] = useState([]);

  const loadData = async () => {
    try {
      const productsDb = await listProducts()
      setProducts(productsDb)
    } catch (error) {
      // console.error(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomListview itemList={products} />
    </SafeAreaView>
  )
}
