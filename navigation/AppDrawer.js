import { createDrawerNavigator } from '@react-navigation/drawer';

// importar screens del menu lateral
import LoginScreen from '../screens/LoginScreen';
import ParkingMapScreen from  '../screens/ParkingMapScreen';

// crear menu lateral
const Drawer = createDrawerNavigator();

// exportar menu lateral
export default function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Login" component={LoginScreen} options={{ title: "Iniciar sesión" }} />
      <Drawer.Screen name="Parking Map" component={ParkingMapScreen} options={{ title: "Mapa de parqueo" }} />
    </Drawer.Navigator>
  );
}