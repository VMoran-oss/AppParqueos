import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// importar screens de los tabs
import LoginScreen from '../screens/LoginScreen';
{/*import SignUpScreen from '../screens/SignUpScreen';*/}
import MallSelectionScreen from '../screens/MallSelectionScreen';
{/*import DirectoryScreen from '../screens/DirectoryScreen';*/}
import ParkingMapScreen from '../screens/ParkingMapScreen';


// crear tabs
const Tab = createBottomTabNavigator();

// exportar tabs
export default function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#0051CA', // color tabs
                tabBarInactiveTintColor: 'blue',

                // configurar icono segun name
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;

                    if (route.name === 'Login') {
                        iconName = focused ? 'key' : 'key-outline';
                    } else if (route.name === 'Parking Map') {
                        iconName = focused ? 'map' : 'map-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Login" component={LoginScreen} options={{ title: "Iniciar sesión" }} />
            {/*<Tab.Screen name="Sign Up" component={SignUpScreen} options={{ title: "Registrarse" }} />*/}
            {/*<Tab.Screen name="Mall Selection" component={MallSelectionScreen} options={{ title: "Seleccionar Centro Comercial " }} />*/}
            {/*<Tab.Screen name="Directory" component={DirectoryScreen} options={{ title: "Directorio" }} />*/}
            <Tab.Screen name="Parking Map" component={ParkingMapScreen} options={{ title: "Mapa de parqueo" }} />
        </Tab.Navigator>
    );
}