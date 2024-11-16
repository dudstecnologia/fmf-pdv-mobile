import React, { useEffect, useState } from 'react';
import {Modal, StyleSheet, Text, Pressable, View, Dimensions} from 'react-native';
import { Camera, useCameraDevice, NoCameraDeviceError, useCodeScanner } from 'react-native-vision-camera';
const { width }  = Dimensions.get('window');

export default function ModalBarcode({ modalVisible, setBarcode, setModalVisible }) {
  const device = useCameraDevice('back');

  const [showCamera, setShowCamera] = useState(false);
  const [codeTemp, setCodeTemp] = useState('');

  useEffect(() => {
    if (modalVisible) {
      setCodeTemp('')
    }
  }, [modalVisible]);

  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();

      if (newCameraPermission == 'granted') {
        setShowCamera(true)
      }
    }
    getPermission();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128'],
    onCodeScanned: (codes) => {
      if (codes[0] && codes[0].value && !codeTemp) {
        setCodeTemp(codes[0].value)
        setBarcode(codes[0].value)
      }
    }
  });

  if (device == null) {
    return <NoCameraDeviceError />
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <Camera
          style={styles.camera}
          device={device}
          isActive={showCamera}
          codeScanner={codeScanner}
        />
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(false)}>
          <Text style={styles.textButtonCancel}>Cancelar</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  camera: {
    width: (width - 20),
    height: (width - 20)
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButtonCancel: {
    color: 'white'
  }
});
