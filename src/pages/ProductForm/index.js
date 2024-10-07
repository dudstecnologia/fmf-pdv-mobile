import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import globalStyles from '../../globalStyles';
import MaskInput, { Masks } from 'react-native-mask-input';

export default function ProductForm({ navigation }) {
  // navigation.setOptions({ headerTitle: 'Editar Produto' })
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('1');

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
                const total = (parseInt(unmasked) / 100).toFixed(2)
                setPrice(total)
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

        <View>
          <Text>{ name }</Text>
          <Text>{ barcode }</Text>
          <Text>{ price }</Text>
          <Text>{ stock }</Text>
        </View>

        <TouchableOpacity style={styles.buttonSave} onPress={() => navigation.navigate('productList')}>
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
