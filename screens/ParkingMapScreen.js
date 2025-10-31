import { useState, useEffect } from 'react';
import { Layout, Input, ButtonRounded } from '../components';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { db } from '../api/firebase'; 
{/*import { doc, onSnapshot } from 'firebase/firestore';*/}
// **CAMBIO 1:** Importar 'collection' y 'query' (si fuera necesario filtrar), pero 'onSnapshot' con 'collection' es clave.
import { collection, onSnapshot } from 'firebase/firestore'; 

//simulación de censores (true = disponible, false = ocupado)

// El mapeo de la grilla (Esto es lo más importante)
const GRID_MAP = [
    // ... (Tu GRID_MAP se mantiene igual, es correcto para mapear)
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

export default function ParkingMap() {
    // Aquí guardaremos el estado de todos los espacios: { 'A1-1': true, 'A1-2': false, ... }
    const [parkingStates, setParkingStates] = useState({}); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // **CAMBIO 2:** Crea la referencia a la colección 'parqueos' completa.
        const collectionRef = collection(db, 'parqueos');
        
        // **CAMBIO 3:** Usa onSnapshot para escuchar cambios en la colección.
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const newParkingStates = {};

            // Recorre cada documento (espacio de parqueo) en la colección.
            snapshot.forEach((doc) => {
                const data = doc.data();
                const espacioId = doc.id; // El ID del documento es el nombre del espacio (ej: 'A1-1')

                // Tu documento tiene un campo 'estado' (ej: "Disponible").
                // Queremos un booleano: true (disponible/verde) o false (ocupado/rojo).
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

        // 4. Importante: Retorna la función de limpieza (unsubscribe)
        return () => unsubscribe();
    }, []); 

    // --- Lógica de Renderizado ---
    if (loading) {
        // ... (el código de carga se mantiene igual)
    }
    
    return (
        <Layout>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Estacionamiento Disponible</Text>
                <Text style={styles.entradaSalida}>Entrada / Salida</Text>
                {/* ... (Título y secciones se mantienen igual) ... */}
                <View style={styles.grid}>
                    {GRID_MAP.map((fila, filaIndex) => {
                        // ... (Lógica de títulos de sección) ...
                        return (
                            <View key={filaIndex} style={{ marginBottom: 10 }}>
                                {filaIndex === 0 && <Text style={styles.section}>Sección A</Text>}
                                {filaIndex === A_ROWS && <Text style={styles.section}>Sección B</Text>}
                                <View style={styles.row}>
                                    {fila.map((espacioId, espacioIndex) => {
                                        // **SIN CAMBIOS AQUÍ:** La lógica de renderizado ahora funciona
                                        // porque 'parkingStates' tiene la estructura que espera: { 'A1-1': true/false }
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
                {/* ... (Leyenda y Styles se mantienen igual) ... */}
            </ScrollView>
        </Layout>
    );
}
// ... (El objeto 'styles' se mantiene igual) ...
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
