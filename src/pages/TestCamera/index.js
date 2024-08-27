import React, { useEffect, useState } from 'react';
import {
  SafeAreaView
} from 'react-native';
import styles from './styles';
import { Camera, useCameraDevice, NoCameraDeviceError, useCodeScanner } from 'react-native-vision-camera';

export default function TestCamera({ navigation }) {
  const device = useCameraDevice('back');

  const [showCamera, setShowCamera] = useState(false);

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
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(codes)
    }
  });

  if (device == null) {
    return <NoCameraDeviceError />
  }

  return (
    <SafeAreaView>
      <Camera
        style={styles.camera}
        device={device}
        isActive={showCamera}
        codeScanner={codeScanner}
      />
    </SafeAreaView>
  )
}
