import { useState, useEffect } from 'react';
import { Layout, Input, ButtonRounded } from '../components';
import { Text, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { obtenerUsuarioPorId } from '../services/userService';

export default function ProfileScreen({ navigation }) {
    const [item, setItem] = useState(null);
    const { user, logout } = useAuth();

    async function cargar() {
        try {
            const obj = await obtenerUsuarioPorId(user?.uid);
            setItem(obj);
        } catch (error) {
            Alert.alert("Error", "No se logro cargar el perfil");
        }
    }
    useEffect(() => {
        cargar();
    }, []);

    return (
        <Layout>
            <Text style={styles.text}> Id: {user?.uid} </Text>
            <Text style={styles.text}> Nombre:{item?.nombre} </Text>
            <Text style={styles.text}> Genero:{item?.genero} </Text>
            <Text style={styles.text}> Email: {user?.email}  </Text>

            <ButtonRounded title="Salir" isPrimary={false} onPress={logout }/>
        </Layout>
    );
}

const styles = StyleSheet.create({
    text: {
        textAlign: "justify",
        fontSize: 14,
        lineHeight: 22.5,
        marginBottom: 15,
    },
});