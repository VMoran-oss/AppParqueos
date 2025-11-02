// importar tabs
import AppTabs from '../navigation/AppTabs';

// importar screens que no se usan tabs
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from  '../screens/SignUpScreen';
import  DirectoryScreen from  '../screens/DirectoryScreen';
import MallSelectionScreen from '../screens/MallSelectionScreen';
import RegisterMallScreen from '../screens/RegisterMallScreen';
import RegisterDirectory from '../screens/RegisterDirectoryScreen';

// importar react navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// crear Stack y Componentes nativos
const Stack = createStackNavigator();
import { View, ActivityIndicator } from 'react-native';

// AuthContext
import { AuthProvider, useAuth } from '../context/AuthContext';
import ParkingMap from '../screens/ParkingMapScreen';
import RegisterDirectoryScreen from '../screens/RegisterDirectoryScreen';

// Stack de autenticación (pantallas para usuarios no logueados)
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={AppTabs} options={{headerShown:false}}  />
    <Stack.Screen name="SignUp" component={SignUpScreen} options={{title:"Registrarse"}}  />
    {/* <Stack.Screen name="ParkingMap" component={ParkingMap} options={{title: "Mapa de parqueo"}}/> */}
  </Stack.Navigator>
);

// Stack principal de la App (pantallas para usuarios logueados)
const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={AppTabs} options={{ headerShown:false }}  />
    <Stack.Screen name="MallSelection" component={MallSelectionScreen} options={{ title: "Centros Comerciales" }}  />
    <Stack.Screen name="Directory" component={DirectoryScreen} options={{ title: "Directorio" }}  />
    <Stack.Screen name="RegisterMall" component={RegisterMallScreen} options={{ title: "Nuevo registro" }} />
    <Stack.Screen name="RegisterDirectory" component={RegisterDirectoryScreen} options={{ title: "Agregar un nuevo negocio" }} />
     {/* <Stack.Screen name="ParkingMap" component={ParkingMap} options={{title: "Mapa de parqueo"}}/> */}
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { user, loading } = useAuth(); // Obtiene el usuario y estado de carga

  // Mostramos un spinner mientras el AuthContext verifica el estado
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* Si 'user' existe, muestra el AppStack, si no, muestra el AuthStack */}
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function AppNavigator () {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};