import { useState, useEffect } from 'react';
import { Layout, Input, ButtonRounded } from '../components';

//simulación de censores (true = disponible, false = ocupado)

const parkingData = [
    [false, true, true, false, true, false],   // Fila 1
    [true, true, false, false, true, true],    // Fila 2
    [false, false, true, true, false, false],  // Fila 3
];

export default function ViewNewScreen() {
    const [mapa, setMapa] = useState('');

    useEffect(() => {
        // Aquí podrías hacer fetch a sensores reales
        setMapa(parkingData);
    }, []);

    return (
        <Layout>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Estacionamiento</Text>
                <Text style={styles.section}>Sección A</Text>


                <View style={styles.grid}>
                    {mapa.map((fila, filaIndex) => (
                        <View key={filaIndex} style={styles.row}>
                            {fila.map((espacio, espacioIndex) => (
                                <View
                                    key={espacioIndex}
                                    style={[
                                        styles.slot,
                                        { backgroundColor: espacio ? '#4CAF50' : '#F44336' }, // verde o rojo
                                    ]}
                                />
                            ))}
                        </View>
                    ))}
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

