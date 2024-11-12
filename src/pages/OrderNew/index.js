import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TextInput, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Text } from '@rneui/themed';
import globalStyles from '../../globalStyles';
import MaskInput, { Masks } from 'react-native-mask-input';
import { createProduct, updateProduct, findProductById } from '../../services/product';

export default function OrderNew({ navigation }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [price, setPrice] = useState('');
  const [qtd, setQtd] = useState('1');

  const [idTemp, setIdTemp] = useState(0);
  const [nameTemp, setNameTemp] = useState('');

  const clearTemp = () => {
    setIdTemp(0)
    setNameTemp('')
  }

  const searchProduct = async () => {
    if (!id) {
      Alert.alert('Ops!', 'O código do produto é obrigatório');
      return false;
    }

    try {
      let product = await findProductById(id)

      if (product) {
        setIdTemp(product.id)
        setNameTemp(product.name)
      } else {
        clearTemp()
        Alert.alert('Ops!', 'Produto não encontrado');
      }
    } catch (e) {
      clearTemp()
      Alert.alert('Ops!', 'Produto não encontrado');
    }
  }

  const addOrder = () => {
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
      Alert.alert('Perfeito!', 'Salvo com sucesso');
    } catch (e) {
      Alert.alert('Ops!', 'Erro ao salvar, detalhes:' + e);
    }
  }

  return (
    <SafeAreaView style={{ padding: 15 }}>
      <View style={{ ...styles.column, justifyContent: 'flex-start', gap: 10 }}>
        <View style={{ width: '25%'}}>
          <Text style={globalStyles.labelBase}>Cod. Produto</Text>
          <TextInput
            keyboardType='numeric'
            placeholder='Cod. Produto'
            style={globalStyles.inputBase}
            onChangeText={setId}
            value={id}
          />
        </View>

        <View style={{ width: '20%'}}>
          <Text style={globalStyles.labelBase}></Text>
          <TouchableOpacity style={styles.buttonOrder} onPress={() => searchProduct()}>
            <Text style={styles.buttonOrderText}>Buscar</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '25%'}}>
          <Text style={globalStyles.labelBase}></Text>
          <TouchableOpacity style={styles.buttonOrder} onPress={() => addOrder()}>
            <Text style={styles.buttonOrderText}>Escanear</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.column}>
        <View style={{ width: '10%'}}>
          <Text style={globalStyles.labelBase}>QTD</Text>
          <TextInput
            keyboardType='numeric'
            placeholder='QTD'
            style={globalStyles.inputBase}
            onChangeText={setQtd}
            value={qtd}
          />
        </View>
        <View style={{ width: '60%'}}>
          <Text style={globalStyles.labelBase}>Produto</Text>
          <TextInput
            placeholder=''
            style={globalStyles.inputBase}
            value={nameTemp}
            readOnly={true}
          />
        </View>
        <View style={{ width: '25%'}}>
          <Text style={globalStyles.labelBase}></Text>
          <TouchableOpacity style={styles.buttonOrder} onPress={() => addOrder()}>
            <Text style={styles.buttonOrderText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.buttonOrderDone} onPress={() => addOrder()}>
        <Text style={styles.buttonOrderText}>Finalizar Venda</Text>
      </TouchableOpacity>

      <ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  labelBase: {
    ...globalStyles.labelBase,
    marginTop: 5
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonSave: {
    ...globalStyles.button,
    marginTop: 15
  },
  buttonOrder: {
    ...globalStyles.button,
    padding: 2,
    height: 55,
    justifyContent: 'center'
  },
  buttonOrderText: {
    ...globalStyles.buttonText,
    fontSize: 25
  },
  buttonOrderDone: {
    ...globalStyles.button,
    backgroundColor: '#43A047',
    marginTop: 5
  }
});
