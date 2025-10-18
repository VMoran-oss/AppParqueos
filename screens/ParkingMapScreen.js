import { useState, useEffect } from 'react';
import { Layout, Input, ButtonRounded } from '../components';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

//simulación de censores (true = disponible, false = ocupado)

const parkingDataA = [
    [false, true, true, false, true, false],   // Fila 1
    [true, true, false, false, true, true],    // Fila 2
    [false, false, true, true, false, false],  // Fila 3
];
const parkingDataB = [
    [true, false, true, true, false, true],    // Fila 1
    [false, true, true, false, true, false],   // Fila 2
    [true, true, false, true, false, true],    // Fila 3
];

export default function LoginScreen() {
    const [mapaCompleto, setMapaCompleto] = useState([]);


    useEffect(() => {
        // Aquí podrías hacer fetch a sensores reales
        setMapaCompleto([...parkingDataA, ...parkingDataB]);
    }, []);

    return (
        <Layout>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Estacionamiento Disponible</Text>

                {/*Mapa completo sección A y B*/}
                {/*<Text style={styles.section}>Sección A</Text> {renderGrid(mapaA)}*/}

                <Text style={styles.entradaSalida}>Entrada / Salida</Text>
                <View style={styles.grid}>
                    {mapaCompleto.map((fila, filaIndex) => {
                        // Mostrar título de Sección B antes de la primera fila de B
                        const showSectionTitle = filaIndex === parkingDataA.length;
                        return (
                            <View key={filaIndex} style={{ marginBottom: 10 }}>
                                {filaIndex === 0 && <Text style={styles.section}>Sección A</Text>}
                                {showSectionTitle && <Text style={styles.section}>Sección B</Text>}
                                <View style={styles.row}>
                                    {fila.map((espacio, espacioIndex) => (
                                        <View
                                            key={espacioIndex}
                                            style={[
                                                styles.slot,
                                                {
                                                    backgroundColor: espacio
                                                        ? filaIndex < parkingDataA.length
                                                            ? '#4CAF50'   // Sección A
                                                            : '#4CAF50'   // Sección B
                                                        : '#F44336',       // Ocupado
                                                },
                                            ]}
                                        />
                                    ))}
                                </View>
                            </View>
                        );
                    })}
                </View>

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

