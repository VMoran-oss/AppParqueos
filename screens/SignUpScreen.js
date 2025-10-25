import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, Input, ButtonRounded } from '../components';
import { FlatList, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { obtenerNoticias, formatDate } from '../services/newService';


export default function RegisterScreen({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [genero, setGenero] = useState('');
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');

    function Confirmar() {
        //logica
        navigation.navigate('Home', { screen: 'Login' });
    }

    return (
        <Layout title="Registro">
            <FlatList
                data={datos}
                renderItem={renderItem}
                keyExtractor={(x) => x.id}
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
