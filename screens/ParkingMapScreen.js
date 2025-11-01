import { useState, useEffect } from 'react';
import { Layout, } from '../components';
import { StyleSheet, View, Text, ScrollView,} from 'react-native';
import { db } from '../api/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
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

// Definimos los centros comerciales para filtro de busqueda con el valor que se guarda en el campo 'centroComercial' en Firestore.
const CENTROS_COMERCIALES = {
    'PlazaMundo': 'Plaza Mundo',
    'ElEncuentro': 'El encuentro',
    'Metrocentro': 'Metrocentro',
    'LasCascadas': 'Las cascadas',
};

// Obtenemos la clave del primer centro para el estado inicial
const VALOR_INICIAL_CENTRO = Object.keys(CENTROS_COMERCIALES)[0];


export default function ParkingMap() {
    // Guardamos el estado de todos los espacios: { 'A1-1': true, 'A1-2': false, ... }
    const [parkingStates, setParkingStates] = useState({});
    const [loading, setLoading] = useState(true);
    //filtro del centro comercial
    const [centroSeleccionado, setCentroSeleccionado] = useState(VALOR_INICIAL_CENTRO);

    useEffect(() => {
        // Referencia a la colección 'parqueos' completa.
        const collectionRef = collection(db, 'parqueos');

        //Para escuchar cambios en la colección.
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const newParkingStates = {};

            const q = query(
                collectionRef,
                // Filtra los documentos donde el campo 'centroComercial' sea igual al 'centroSeleccionado'
                where('centroComercial', '==', centroSeleccionado)
            );
            // Recorre cada documento (espacio de parqueo) en la colección.
            snapshot.forEach((doc) => {
                const data = doc.data();
                const espacioId = doc.id; // El ID del documento es el nombre del espacio (ej: 'A1-1')

                // Compara el campo 'estado' con el valor de "Disponible"
                const isDisponible = data.estado === ESTADO_DISPONIBLE;

                // Almacena el estado en el objeto usando el ID del documento.
                newParkingStates[espacioId] = isDisponible;
            });

            // Actualiza el estado con todos los datos.
            setParkingStates(newParkingStates);
            setLoading(false);

        }, (error) => {
            console.error("Error al escuchar cambios en Firestore:", error);
            setLoading(false);
        });

        //Retorna la función de limpieza (unsubscribe)
        return () => unsubscribe();
    }, []);

    // --- Lógica de Renderizado ---
    if (loading) {

    }

    return (
        <Layout>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Estacionamiento Disponible</Text>
                {/* Añadimos el picker (SELECTOR) */}
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Selecciona Centro Comercial:</Text>
                    <Picker
                        selectedValue={centroSeleccionado}
                        onValueChange={(itemValue) => setCentroSeleccionado(itemValue)} // Cambia el estado
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                    >
                        {Object.entries(CENTROS_COMERCIALES).map(([key, value]) => (
                            <Picker.Item key={key} label={value} value={key} />
                        ))}
                    </Picker>
                </View>
                <Text style={styles.entradaSalida}>Entrada / Salida</Text>
                {/*Título y secciones*/}
                <View style={styles.grid}>
                    {GRID_MAP.map((fila, filaIndex) => {
                        // ... (Lógica de títulos de sección) ...
                        return (
                            <View key={filaIndex} style={{ marginBottom: 10 }}>
                                {filaIndex === 0 && <Text style={styles.section}>Sección A</Text>}
                                {filaIndex === A_ROWS && <Text style={styles.section}>Sección B</Text>}
                                <View style={styles.row}>
                                    {fila.map((espacioId, espacioIndex) => {
                                        // Lógica de renderizado
                                        //'parkingStates' tiene la estructura que espera: { 'A1-1': true/false }
                                        const isDisponible = parkingStates[espacioId] === true;

                                        return (
                                            <View
                                                key={espacioIndex}
                                                style={[
                                                    styles.slot,
                                                    {
                                                        // Si isDisponible es true (verde), si es false (rojo)
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
        paddingTop: 20,    // Mantenemos el espacio arriba
        paddingBottom: 20,
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
      // Estilos picker
        pickerContainer: {
            width: '100%',
            marginBottom: 20,
            backgroundColor: '#f9f6f6ff',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#fcf6f6ff',
            paddingHorizontal: 10,
        },
        pickerLabel: {
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 5,
            marginTop: 5,
            color: '#555',
        },
        picker: {
            height: 50,
            width: '100%',
        },
        pickerItem: {
            height: 50,
        },
    section: {
        fontSize: 16,
        marginBottom: 20,
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

