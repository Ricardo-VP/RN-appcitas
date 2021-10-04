import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableWithoutFeedbackBase,
} from 'react-native';
import Cita from './components/cita';
import Formulario from './components/formulario';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {

  const [mostrarForm, setMostrarForm] = useState(false);

  // Definir el state de citas
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        if(citasStorage){
          setCitas(JSON.parse(citasStorage)); // Parsear el string a un array
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCitasStorage();
  }, [])

  

  // Elimina los pacientes del state
  const eliminarPaciente = id => {
    const citasFiltradas = citas.filter(cita => cita.id !== id); // Filtra el array de citas
    setCitas(citasFiltradas); // Actualiza el state
    guardarCitasStorage(JSON.stringify(citasFiltradas)); // Guarda en el storage
  };

  // Muestra u oculta el formulario
  const mostrarFormulario = () => {
    setMostrarForm(!mostrarForm);
  };

  // Ocultar teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  // Almacenar en el async storage
  const guardarCitasStorage = async (citasJSON) => {
    try {
      await AsyncStorage.setItem('citas', citasJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de citas</Text>
        <View>
          <TouchableHighlight
            onPress={() => mostrarFormulario()}
            style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}>
              {mostrarForm ? 'CANCELAR CREAR CITA' : 'CREAR NUEVA CITA'}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear nueva cita</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                setMostrarForm={setMostrarForm}
                guardarCitasStorage={guardarCitasStorage}
              />
            </>
          ) : (
            <>
              <Text style={styles.titulo}>
                {citas.length > 0
                  ? 'Administra tus citas'
                  : 'No hay citas, agrega una'}
              </Text>
              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={({item}) => (
                  <Cita item={item} eliminarPaciente={eliminarPaciente} />
                )}
                keyExtractor={cita => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 20,
  },
  textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
