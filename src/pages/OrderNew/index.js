import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList } from 'react-native';
import { Text } from '@rneui/themed';
import globalStyles from '../../globalStyles';
import { findProductById, findProductByBarcode } from '../../services/product';
import CustomRow from '../../components/CustomRow';
import ModalBarcode from '../../components/ModalBarcode';

export default function OrderNew({ navigation }) {
  const [id, setId] = useState('');
  const [qtd, setQtd] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);

  const [productTemp, setProductTemp] = useState(null)
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getTotal()
  }, [products]);

  const getTotal = () => {
    const totalTemp = products.reduce((v, e) => {
      return v + (e.price * e.qtd);
    }, 0);

    setTotal(totalTemp);
  }

  const searchProduct = async () => {
    if (!id) {
      Alert.alert('Ops!', 'O código do produto é obrigatório');
      return false;
    }

    try {
      let product = await findProductById(id)

      if (!product) {
        throw ''
      }

      setProductTemp(product)
    } catch (e) {
      setProductTemp(null)
      Alert.alert('Ops!', 'Produto não encontrado');
    }
  }

  const addProduct = async = () => {
    if (isNaN(parseInt(qtd)) || qtd.includes(',') || qtd.includes('.')) {
      Alert.alert('Ops!', 'A quantidade deve ser um número inteiro');
      return false;
    }

    if (!productTemp) {
      Alert.alert('Ops!', 'Nenhum produto está selecionado');
      return false;
    }

    let findProduct = products.findIndex(p => p.id == productTemp.id)

    if (findProduct >= 0) {
      products[findProduct].qtd += parseInt(qtd) 
      setProducts([...products])
    } else {
      setProducts([...products, { ...productTemp, qtd: parseInt(qtd) }])
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

  const setBarcode = async (barcode) => {
    setModalVisible(false);

    try {
      let product = await findProductByBarcode(barcode)

      if (!product) {
        throw ''
      }

      setProductTemp(product)
    } catch (e) {
      setProductTemp(null)
      Alert.alert('Ops!', 'Produto não encontrado');
    }
  }

  return (
    <SafeAreaView style={{ padding: 15 }}>
      <ModalBarcode modalVisible={modalVisible} setBarcode={setBarcode} setModalVisible={setModalVisible} />
      <View style={{ ...styles.column, justifyContent: 'flex-start', gap: 10 }}>
        <View style={{ width: '30%'}}>
          <Text style={globalStyles.labelBase}>Cod. Produto</Text>
          <TextInput
            keyboardType='numeric'
            placeholder='Cod. Produto'
            style={globalStyles.inputBase}
            onChangeText={setId}
            value={id}
          />
        </View>

        <View style={{ width: '25%'}}>
          <Text style={globalStyles.labelBase}></Text>
          <TouchableOpacity style={styles.buttonOrder} onPress={() => searchProduct()}>
            <Text style={styles.buttonOrderText}>Buscar</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '30%'}}>
          <Text style={globalStyles.labelBase}></Text>
          <TouchableOpacity style={styles.buttonOrder} onPress={() => setModalVisible(true) }>
            <Text style={styles.buttonOrderText}>Escanear</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.column}>
        <View style={{ width: '15%'}}>
          <Text style={globalStyles.labelBase}>QTD</Text>
          <TextInput
            keyboardType='numeric'
            placeholder='QTD'
            style={globalStyles.inputBase}
            onChangeText={setQtd}
            value={qtd}
          />
        </View>
        <View style={{ width: '50%'}}>
          <Text style={globalStyles.labelBase}>Produto</Text>
          <TextInput
            placeholder=''
            style={globalStyles.inputBase}
            value={productTemp?.name}
            readOnly={true}
          />
        </View>
        <View style={{ width: '30%'}}>
          <Text style={globalStyles.labelBase}></Text>
          <TouchableOpacity style={styles.buttonOrder} onPress={() => addProduct()}>
            <Text style={styles.buttonOrderText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.column}>
        <View style={{ width: '45%'}}>
          <Text style={styles.txtTotal}>R$ { total.toFixed(2) }</Text>
        </View>
        <View style={{ width: '55%'}}>
          <TouchableOpacity style={styles.buttonOrderDone} onPress={() => addOrder()}>
            <Text style={styles.buttonOrderText}>Finalizar Venda</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => <CustomRow
          product={item}
        />}
      />
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
  },
  txtTotal: {
    fontSize: 35,
    color: 'green'
  }
});
