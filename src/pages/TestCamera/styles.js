import { StyleSheet, Dimensions } from 'react-native';
const { width }  = Dimensions.get('window');

const styles = StyleSheet.create({
  camera: {
    width: (width - 20),
    height: (width - 20),
    marginTop: 10
  }
})

export default styles
