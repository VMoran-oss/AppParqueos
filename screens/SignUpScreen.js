import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, Input, ButtonRounded } from '../components';
import { Alert } from 'react-native';
import { agregarUsuarios } from '../services/userService';

export default function RegisterScreen({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [genero, setGenero] = useState('');
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('')

    async function guardar(){
        //validar
        if (!nombre || !genero || !email || !clave || !confirmarClave) {
          Alert.alert( "Error", "Por favor, completa todos los campos obligatorios." );
          return;
        }

        // guardar usuario
        await agregarUsuarios({
            nombre: nombre,
            genero: genero,
            email: email,
            clave: clave,
            confirmarClave: confirmarClave,
        });

        navigation.popToTop(); //cerrar screen
    }

    return (
        <Layout title="Registro">
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
                <ButtonRounded title="Guardar" onPress={guardar} />    
            <ButtonRounded title="Cancelar" isPrimary={false} onPress={()=> navigation.popToTop()} />
               <View style={styles.buttonContainer}>
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
