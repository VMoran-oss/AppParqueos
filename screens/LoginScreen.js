import { useState, useEffect } from 'react';
import { Layout, Input, ButtonRounded } from '../components';
import MallSelection from './MallSelectionScreen';
import {Alert} from 'react-native';
import { verificarUsuario } from '../services/userService';

export default function LoginScreen({ navigation }){
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');

    async function iniciarSesion(){
           // Validar campos vacíos
    if (!email || !clave) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      // Verificar usuario en el servicio
      const usuarioValido = await verificarUsuario(email, clave);

      if (usuarioValido) {
        Alert.alert('Bienvenido', 'Inicio de sesión exitoso.');
        navigation.navigate('MallSelection'); // Redirigir a la pantalla principal
      } else {
        Alert.alert('Error', 'Correo o contraseña incorrectos.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un problema al iniciar sesión.');
      console.error(error);
    }
}

    return (
        <Layout>
            <Input 
                label="Correo electronico"
                placeholder="codigo@esfe.agape.edu.sv"
                type="email"
                value={email}
                onChangeText={setEmail} />
            <Input 
                label="Constraseña"
                placeholder="*****"
                hideText={true}
                value={clave}
                onChangeText={setClave} />
            <ButtonRounded title="Iniciar Sesion" onPress={iniciarSesion }/>
            <ButtonRounded title="Registrarse" isPrimary={false}    
             onPress={() => navigation.navigate('SignUp')}/>
        </Layout>
    );
}
