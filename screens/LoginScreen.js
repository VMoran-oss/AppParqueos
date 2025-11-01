import { useState, useEffect } from 'react';
import { Layout, Input, ButtonRounded } from '../components';
import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const { login } = useAuth();

  async function iniciarSesion() {
    // Validar campos vacíos
    if (!email || !clave) {
      Alert.alert("Error", "Ingresa un email y contraseña");
      return;
    }

    try {
      await login(email, clave);
    } catch (error) {
      Alert.alert("Error", "Error al iniciar sesión, verifica tus credenciales.");
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
    <ButtonRounded title="Iniciar Sesion" onPress={iniciarSesion} />
    <ButtonRounded title="Registrarse" isPrimary={false}
      onPress={() => navigation.navigate('SignUp')} />
  </Layout>
);
  }

