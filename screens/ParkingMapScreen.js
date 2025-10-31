import { useState, useEffect } from 'react';
import { Layout, Input, ButtonRounded } from '../components';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { db } from '../api/firebase'; 
import { doc, onSnapshot } from 'firebase/firestore';

//simulación de censores (true = disponible, false = ocupado)

// El mapeo de la grilla (Esto es lo más importante)
// Necesitas saber qué espacio de la BD corresponde a qué posición en el mapa.
const GRID_MAP = [
    // Fila 0 (Sección A)
    ['A1-1', 'A1-2', 'A1-3', 'A1-4', 'A1-5', 'A1-6'],
    ['A2-1', 'A2-2', 'A2-3', 'A2-4', 'A2-5', 'A2-6'],
    ['A3-1', 'A3-2', 'A3-3', 'A3-4', 'A3-5', 'A3-6'],
    // Fila 3 (Sección B)
    ['B1-1', 'B1-2', 'B1-3', 'B1-4', 'B1-5', 'B1-6'],
    ['B2-1', 'B2-2', 'B2-3', 'B2-4', 'B2-5', 'B2-6'],
    ['B3-1', 'B3-2', 'B3-3', 'B3-4', 'B3-5', 'B3-6'],
];

// Define cuántas filas son de la Sección A para el título
const A_ROWS = 3;

export default function ParkingMap() {
    // Aquí guardaremos el estado de todos los espacios: { 'A1-1': true, 'A1-2': false, ... }
    const [parkingStates, setParkingStates] = useState({}); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Crea la referencia al documento único 'mapa_completo'
        const docRef = doc(db, 'parqueos', '1');
        
        // 2. Usa onSnapshot para escuchar cambios en tiempo real
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                // Guarda todos los datos del documento
                setParkingStates(docSnap.data());
            } else {
                console.log("No se encontró el documento '1'.");
                setParkingStates({}); // Limpia los datos si no existe
            }
            setLoading(false);
        }, (error) => {
             console.error("Error al escuchar cambios en Firestore:", error);
             setLoading(false);
        });

        // 3. Importante: Retorna la función de limpieza (unsubscribe)
        // Esto detiene la escucha de Firebase cuando el componente se desmonta.
        return () => unsubscribe();
    }, []); 

    // --- Lógica de Renderizado ---
    if (loading) {
        return (
            <Layout>
                <View style={styles.container}>
                    <Text style={styles.title}>Cargando Mapa...</Text>
                </View>
            </Layout>
        );
    }
    
    return (
        <Layout>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Estacionamiento Disponible</Text>
                <Text style={styles.entradaSalida}>Entrada / Salida</Text>
                <View style={styles.grid}>
                    {GRID_MAP.map((fila, filaIndex) => {
                        // Lógica para mostrar los títulos de sección
                        const showSectionBTitle = filaIndex === A_ROWS; 
                        return (
                            <View key={filaIndex} style={{ marginBottom: 10 }}>
                                {filaIndex === 0 && <Text style={styles.section}>Sección A</Text>}
                                {showSectionBTitle && <Text style={styles.section}>Sección B</Text>}
                                <View style={styles.row}>
                                    {fila.map((espacioId, espacioIndex) => {
                                        // **AQUÍ ESTÁ LA CONEXIÓN:** // Usa el ID del espacio (ej: 'A1-1') para obtener su estado (true/false)
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

                {/* Leyenda y Styles (sin cambios, genial) */}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
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
