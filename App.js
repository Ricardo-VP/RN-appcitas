import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const App = () => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administrador de citas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor:{
    backgroundColor: '#AA076B',
    flex: 1,
  },
  titulo: {
    color: '#FFF',
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
