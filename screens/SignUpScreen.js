import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Layout, Input, ButtonRounded } from '../components';
import { Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { agregarUsuarios } from '../services/userService';

export default function RegisterScreen({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [genero, setGenero] = useState('');
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');

    async function guardar() {
        if (!nombre || !genero || !email || !clave || !confirmarClave) {
            Alert.alert("Error", "Por favor, completa todos los campos obligatorios.");
            return;
        }

        await agregarUsuarios({ nombre, genero, email, clave, confirmarClave });
        navigation.popToTop();
    }

    return (
        <Layout title="Registro">
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.form}>
                    <Text style={styles.subtitle}>Crea tu cuenta</Text>

                    <Input
                        label="Nombre completo"
                        placeholder="Ej. Juan Pérez"
                        type="default"
                        value={nombre}
                        onChangeText={setNombre}
                    />

                    {/* Campo Género con Picker estilizado */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Género</Text>
                        <View style={styles.inputBox}>
                            <Picker
                                selectedValue={genero}
                                onValueChange={setGenero}
                                style={styles.picker}
                                itemStyle={styles.pickerItem}
                            >
                                <Picker.Item label="Selecciona tu género" value="" />
                                <Picker.Item label="Masculino" value="Masculino" />
                                <Picker.Item label="Femenino" value="Femenino" />
                                <Picker.Item label="Otro" value="Otro" />
                            </Picker>
                        </View>
                    </View>

                    <Input
                        label="Correo electrónico"
                        placeholder="correo@ejemplo.com"
                        type="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Input
                        label="Contraseña"
                        placeholder="••••••"
                        hideText={true}
                        value={clave}
                        onChangeText={setClave}
                    />

                    <Input
                        label="Confirmar contraseña"
                        placeholder="••••••"
                        hideText={true}
                        value={confirmarClave}
                        onChangeText={setConfirmarClave}
                    />

                    <View style={styles.buttonGroup}>
                        <ButtonRounded title="Guardar" onPress={guardar} />
                        <ButtonRounded
                            title="Cancelar"
                            isPrimary={false}
                            onPress={() => navigation.popToTop()}
                        />
                    </View>
                </View>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f8f9fa',
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 12,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 6,
        fontSize: 14,
        color: '#444',
    },
    inputBox: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    picker: {
        height: 48,
        width: '100%',
        fontSize: 16,
        color: '#000',
    },
    pickerItem: {
        fontSize: 16,
        color: '#000',
    },
    buttonGroup: {
        marginTop: 16,
        gap: 10,
    },
});
