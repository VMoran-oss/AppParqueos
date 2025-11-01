import { useState, useEffect } from 'react';
import { Layout,} from '../components';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { db } from '../api/firebase';
import { collection, onSnapshot, query,where } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

// El mapeo de la grilla 
const GRID_MAP = [
    ['A1-1', 'A1-2', 'A1-3', 'A1-4', 'A1-5', 'A1-6'],
    ['A2-1', 'A2-2', 'A2-3', 'A2-4', 'A2-5', 'A2-6'],
    ['A3-1', 'A3-2', 'A3-3', 'A3-4', 'A3-5', 'A3-6'],
    ['B1-1', 'B1-2', 'B1-3', 'B1-4', 'B1-5', 'B1-6'],
    ['B2-1', 'B2-2', 'B2-3', 'B2-4', 'B2-5', 'B2-6'],
    ['B3-1', 'B3-2', 'B3-3', 'B3-4', 'B3-5', 'B3-6'],
];

// Define cuántas filas son de la Sección A para el título
const A_ROWS = 3;

// Constantes para el estado, para evitar errores de tipeo
const ESTADO_DISPONIBLE = "Disponible";

// <-- 1. Definimos los centros comerciales para el Picker
// Los 'keys' (ej: 'PlazaMundo') deben coincidir EXACTAMENTE
// con el valor que guardas en el campo 'centroComercial' en Firestore.
const CENTROS_COMERCIALES = {
    'PlazaMundo': 'Plaza Mundo',
    'ElEncuentro': 'El encuentro',
    'Metrocentro': 'Metrocentro',
    'LasCascadas': 'Las cascadas',
};

export default function ParkingMap() {
    // <-- 2. Estado para guardar el mall seleccionado
    const [selectedMall, setSelectedMall] = useState('PlazaMundo'); // Valor inicial
    
    const [parkingStates, setParkingStates] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setParkingStates({}); // Limpia los estados al cambiar de mall
        
        // Referencia a la colección 'parqueos' completa.
        const collectionRef = collection(db, 'parqueos');

        // <-- 3. Creamos la consulta (query) CON EL FILTRO
        // Filtramos donde el campo "centroComercial" sea igual al mall seleccionado
        const q = query(collectionRef, where("centroComercial", "==", selectedMall));

        // <-- 4. Escuchamos la consulta (q), no la colección (collectionRef)
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newParkingStates = {};

            // El resto de la lógica es la misma que tenías
            snapshot.forEach((doc) => {
                const data = doc.data();
                const espacioId = doc.id; 
                const isDisponible = data.estado === ESTADO_DISPONIBLE;
                newParkingStates[espacioId] = isDisponible;
            });

            setParkingStates(newParkingStates);
            setLoading(false);

        }, (error) => {
            console.error("Error al escuchar cambios en Firestore:", error);
            // ¡Revisa la consola para ver el error del índice!
            setLoading(false);
        });

        return () => unsubscribe();
        
    // <-- 5. El useEffect se ejecuta cada vez que 'selectedMall' cambia
    }, [selectedMall]); 


    // --- Lógica de Renderizado ---
    
    // Obtenemos el nombre "bonito" del mall para el título
    const mallName = CENTROS_COMERCIALES[selectedMall];

    return (
        <Layout>
            <ScrollView contentContainerStyle={styles.container}>
                
                {/* Menu de las opciones de busqueda*/}
                <Text style={styles.pickerLabel}>Selecciona un Centro Comercial:</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedMall}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedMall(itemValue)
                        }>
                        
                        {/* Itera sobre las llaves de CENTROS_COMERCIALES */}
                        {Object.keys(CENTROS_COMERCIALES).map((mallKey) => (
                            <Picker.Item 
                                key={mallKey} 
                                label={CENTROS_COMERCIALES[mallKey]} 
                                value={mallKey} 
                            />
                        ))}
                    </Picker>
                </View>

                {/* Un titulo dinamico utilizado para entrada y salida */}
                <Text style={styles.title}>{mallName}</Text>
                <Text style={styles.entradaSalida}>Entrada / Salida</Text>
                
                {/* Lógica de Carga*/}
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 40 }}/>
                ) : (
                    <View style={styles.grid}>
                        {GRID_MAP.map((fila, filaIndex) => { 
                            return (
                                <View key={filaIndex} style={{ marginBottom: 10 }}>
                                    {filaIndex === 0 && <Text style={styles.section}>Sección A</Text>}
                                    {filaIndex === A_ROWS && <Text style={styles.section}>Sección B</Text>}
                                    <View style={styles.row}>
                                        {fila.map((espacioId, espacioIndex) => {
                                            //Lógica de estado 
                                            const isDisponible = parkingStates[espacioId] === true;

                                            return (
                                                <View
                                                    key={espacioIndex}
                                                    style={[
                                                        styles.slot,
                                                        {
                                                            backgroundColor: isDisponible ? '#4CAF50' : '#F44336',
                                                        },
                                                    ]}
                                                />
                                            );
                                        })}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                )}
                
                {/* Leyenda */}
                <View style={styles.legendContainer}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
                        <Text>Disponible</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: '#F44336' }]} />
                        <Text>Ocupado</Text>
                    </View>
                </View>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
    },
    // Estilos para el Picker
    pickerLabel: {
        fontSize: 16,
        fontWeight: '600',
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    pickerContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        marginBottom: 20, 
    },
    picker: {
        width: '100%',
        height: 50, 
    },
    
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    
    entradaSalida: { 
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
    },
    section: {
        fontSize: 16,
        marginBottom: 10, 
        fontWeight: 'bold', 
    },
    grid: {
        flexDirection: 'column',
        gap: 10,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    slot: {
        width: 40,
        height: 80,
        borderRadius: 6,
    },
    legendContainer: {
        marginTop: 20,
        flexDirection: 'row',
        gap: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    legendColor: {
        width: 20,
        height: 20,
        borderRadius: 4,
    },
});