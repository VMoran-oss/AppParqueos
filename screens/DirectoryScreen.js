import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { db } from '../api/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function DirectoryScreen() {
  const [negocios, setNegocios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [horario, setHorario] = useState('');
  const [estado, setEstado] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');

  const negociosPreCargados = [
    {
      nombre: 'Burger King',
      horario: '7:00am - 10:00pm',
      estado: 'Abierto',
      imagenUrl: 'https://plazanorte.pe/wp-content/uploads/2024/03/burger-king-3-1.jpg'
    },
    {
      nombre: 'Don pollo',
      horario: '09:00am a - 9:00pm',
      estado: 'Cerrado',
      imagenUrl: 'https://www.galerias.com.sv/wp-content/uploads/2021/07/1-41.jpg'
    },
    {
      nombre: 'Dollarcity',
      horario: '07:00am a- 6:00pm',
      estado: 'Abierto',
      imagenUrl: 'https://dollarcity.com/wp-content/uploads/2023/09/dollarcity.jpg'
    }
  ];

  const precargarNegocios = async () => {
    try {
      const col = collection(db, 'negocios');
      const snapshot = await getDocs(col);
      if (snapshot.empty) {
        for (const negocio of negociosPreCargados) {
          await addDoc(col, negocio);
        }
      }
      cargarNegocios();
    } catch (error) {
      console.error('Error precargando negocios:', error);
    }
  };

  // --- Cargar todos los negocios ---
  const cargarNegocios = async () => {
    try {
      const col = collection(db, 'negocios');
      const snapshot = await getDocs(col);
      const lista = [];
      snapshot.forEach((doc) => lista.push({ id: doc.id, ...doc.data() }));
      setNegocios(lista);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron cargar los negocios');
    }
  };

  useEffect(() => {
    precargarNegocios();
  }, []);

  // --- Agregar negocio ---
  const agregarNegocio = async () => {
    if (!nombre || !horario || !estado || !imagenUrl) {
      Alert.alert('Error', 'Debes completar todos los campos');
      return;
    }
    try {
      await addDoc(collection(db, 'negocios'), { nombre, horario, estado, imagenUrl });
      setNombre('');
      setHorario('');
      setEstado('');
      setImagenUrl('');
      cargarNegocios();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo agregar el negocio');
    }
  };

  // --- Render de negocio con placeholder ---
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.nombre}</Text>
      <Text>Horario: {item.horario}</Text>
      <Text>Estado: {item.estado}</Text>
      <Image
        source={{ uri: item.imagenUrl || 'https://via.placeholder.com/150' }}
        style={styles.image}
        resizeMode="contain"
        onError={(e) => console.log('Imagen inválida, mostrando placeholder')}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Negocio</Text>
      <TextInput placeholder="Nombre del negocio" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Horario" value={horario} onChangeText={setHorario} style={styles.input} />
      <TextInput placeholder="Estado (Abierto / Cerrado)" value={estado} onChangeText={setEstado} style={styles.input} />
      <TextInput placeholder="URL Imagen" value={imagenUrl} onChangeText={setImagenUrl} style={styles.input} />
      <Button title="Agregar Negocio" onPress={agregarNegocio} />

      <Text style={styles.title}>Lista de Negocios</Text>
      <FlatList
        data={negocios}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 8, borderRadius: 5 },
  card: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginVertical: 5, alignItems: 'center' },
  cardTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  image: { width: 200, height: 200, marginTop: 5, backgroundColor: '#eee' } // fondo gris si no carga
});