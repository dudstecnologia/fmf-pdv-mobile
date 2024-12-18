import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TextInput, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Text } from '@rneui/themed';
import globalStyles from '../../globalStyles';
import MaskInput, { Masks } from 'react-native-mask-input';
import { createProduct, updateProduct } from '../../services/product';

export default function ProductForm({ navigation, route }) {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('1');

  const checkInit = () => {
    if (route.params && route.params.product) {
      navigation.setOptions({ headerTitle: 'Editar Produto' })
  
      setId(route.params.product.id)
      setName(route.params.product.name)
      setBarcode(route.params.product.barcode)
      setPrice(`${route.params.product.price.toFixed(2)}`)
      setStock(`${route.params.product.stock}`)
    }
  }

  useEffect(() => {
    checkInit()
  }, [])

  const saveProduct = () => {
    if (!name || !barcode || !price || !stock) {
      Alert.alert('Ops!', 'Todos os campos são obrigatórios');
      return false;
    }

    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      Alert.alert('Ops!', 'O preço é obrigatório');
      return false;
    }

    if (isNaN(parseInt(stock)) || stock.includes(',') || stock.includes('.')) {
      Alert.alert('Ops!', 'O estoque deve ser um número inteiro');
      return false;
    }

    try {
      if (id == 0) {
        createProduct({
          name,
          barcode,
          price,
          stock
        })

        setId(0)
        setName('')
        setBarcode('')
        setPrice('')
        setStock('1')
      } else {
        updateProduct({
          id,
          name,
          barcode,
          price,
          stock
        })
      }

      Alert.alert('Perfeito!', 'Salvo com sucesso');
    } catch (e) {
      Alert.alert('Ops!', 'Erro ao salvar, detalhes:' + e);
    }
  }

  return (
    <SafeAreaView style={{ padding: 15 }}>
      <ScrollView>
        <Text style={globalStyles.labelBase}>Nome do Produto</Text>
        <TextInput
          placeholder='Insira o nome'
          style={globalStyles.inputBase}
          onChangeText={setName}
          value={name}
        />

        <Text style={styles.labelBase}>Código de Barras</Text>
        <TextInput
          placeholder='Insira o código de barras'
          style={globalStyles.inputBase}
          onChangeText={setBarcode}
          value={barcode}
        />

        <View style={styles.column}>
          <View style={{ width: '48%'}}>
            <Text style={globalStyles.labelBase}>Preço</Text>
            <MaskInput
              style={globalStyles.inputBase}
              value={price}
              onChangeText={(masked, unmasked) => {
                const total = (parseInt(!unmasked ? '0' : unmasked) / 100).toFixed(2);
                setPrice(total);
              }}
              mask={Masks.BRL_CURRENCY}
            />
          </View>
          <View style={{ width: '48%'}}>
            <Text style={globalStyles.labelBase}>Estoque</Text>
            <TextInput
              keyboardType='numeric'
              placeholder='Insira o estoque'
              style={globalStyles.inputBase}
              onChangeText={setStock}
              value={stock}
            />
          </View>
        </View>

        {/* <View>
          <Text>{ name }</Text>
          <Text>{ barcode }</Text>
          <Text>{ price }</Text>
          <Text>{ stock }</Text>
        </View> */}

        <TouchableOpacity style={styles.buttonSave} onPress={() => saveProduct()}>
          <Text style={globalStyles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  labelBase: {
    ...globalStyles.labelBase,
    marginTop: 10
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  buttonSave: {
    ...globalStyles.button,
    marginTop: 15
  }
});
