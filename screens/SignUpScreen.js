import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, Input, ButtonRounded } from '../components';
import { FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { obtenerUsuarios } from '../services/userService';


export default function RegisterScreen({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [genero, setGenero] = useState('');
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');
    const [loading, setLoading] = useState(true);
    const [datos, setDatos] = useState([]);

    async function buscar() {
    try {
        const lista = await obtenerUsuarios();
        setDatos(lista); // cargar usuarios
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
}
    useEffect(() => {
        buscar();
    }, []);

    function renderItem({ item, navigation }) {
    return (
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('ViewNew', { usuario: item })}
        >
            <Text style={styles.title}>{item.nombre}</Text>
            <Text style={styles.subTitle}>CorreoElectronico: {item.correoElectronico}</Text>
            <Text style={styles.subTitle}>Genero: {item.genero}</Text>
        </TouchableOpacity>
    );
}
if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

    function Confirmar() {
        //logica
        navigation.navigate('Home', { screen: 'Login' });
    }

    return (
        <Layout title="Registro">
            <FlatList
                data={datos}                
                renderItem={({ item }) => renderItem({ item, navigation })}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.form}>
                <Input
                    label="Nombre"
                    placeholder="Juan Perez"
                    type="default"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <Input
                    label="Género"
                    placeholder="Femenino / Masculino"
                    type="default"
                    value={genero}
                    onChangeText={setGenero}
                />
                <Input
                    label="Correo electrónico"
                    placeholder="codigo@esfe.agape.edu.sv"
                    type="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    label="Contraseña"
                    placeholder="*****"
                    hideText={true}
                    value={clave}
                    onChangeText={setClave}
                />
                <Input
                    label="Confirmar contraseña"
                    placeholder="*****"
                    hideText={true}
                    value={confirmarClave}
                    onChangeText={setConfirmarClave}
                />

                <View style={styles.buttonContainer}>
                    <ButtonRounded title="Confirmar" onPress={Confirmar} />
                </View>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 12,
    },
    buttonContainer: {
        marginTop: 25,
        alignItems: 'center',
    },
});
