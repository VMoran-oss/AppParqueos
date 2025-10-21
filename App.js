import React from 'react'; 
import MallSelectionScreen from './screens/MallSelectionScreen';
import SignUpScreen from './screens/SignUpScreen';
// importar tabs
import AppTabs from './navigation/AppTabs';

// importar screens que no se usan en los tabs
import LoginScreen from './screens/LoginScreen';
import ParkingMapScreen from './screens/ParkingMapScreen';

// importar react navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// crear Stack
const Stack = createStackNavigator();

// exportar App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={AppTabs} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Ingresar" }} />
        <Stack.Screen name="Parking Map" component={ParkingMapScreen} options={{ title: "Ver Parqueos" }} /> */}

        <Stack.Screen 
          name="MallSelection" 
          component={MallSelectionScreen} 
          options={{ title: "Seleccionar Centro Comercial" }} 
        />

        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: "Registro"}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
