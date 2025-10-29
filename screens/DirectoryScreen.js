import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { db } from '../api/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export default function DirectoryScreen({ route }) {

  const { nombreCentro } = route.params;

  const [negocios, setNegocios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [horario, setHorario] = useState('');
  const [estado, setEstado] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');

  // --- Cargar los negocios solo del centro actual ---
  const cargarNegocios = async () => {
    try {
      const col = collection(db, 'negocios');
      const q = query(col, where('plaza', '==', nombreCentro)); // 👈 Filtra solo por el centro actual
      const snapshot = await getDocs(q);
      const lista = [];
      snapshot.forEach((doc) => lista.push({ id: doc.id, ...doc.data() }));
      setNegocios(lista);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron cargar los negocios');
    }
  };

  useEffect(() => {
    cargarNegocios();
  }, []);

  // --- Agregar nuevo negocio al centro actual ---
  const agregarNegocio = async () => {
    if (!nombre || !horario || !estado) {
      Alert.alert('Error', 'Debes completar todos los campos requeridos');
      return;
    }

    try {
      await addDoc(collection(db, 'negocios'), {
        nombre,
        horario,
        estado,
        imagenUrl: imagenUrl || '', 
        plaza: nombreCentro 
      });

      // Limpia los campos y recarga la lista
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

  // --- Render de negocio ---
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.nombre}</Text>
      <Text>Horario: {item.horario}</Text>
      <Text>Estado: {item.estado}</Text>

      {item.imagenUrl ? (
        <Image
          source={{ uri: item.imagenUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <View style={[styles.image, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#888' }}>Sin imagen</Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Título con el nombre del centro actual */}
      <Text style={styles.title}> Estás en {nombreCentro}</Text>

      {/* Formulario de nuevo negocio */}
      <Text style={styles.subtitle}>Agregar Nuevo Negocio</Text>
      <TextInput
        placeholder="Nombre del negocio"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Horario (ej: 8:00am - 9:00pm)"
        value={horario}
        onChangeText={setHorario}
        style={styles.input}
      />
      <TextInput
        placeholder="Estado (Abierto / Cerrado)"
        value={estado}
        onChangeText={setEstado}
        style={styles.input}
      />
      <TextInput
        placeholder="URL de la imagen (opcional)"
        value={imagenUrl}
        onChangeText={setImagenUrl}
        style={styles.input}
      />

      <Button title="Agregar Negocio" onPress={agregarNegocio} />

      {/* Lista de negocios */}
      <Text style={styles.subtitle}>Lista de Negocios</Text>
      <FlatList
        data={negocios}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#222', textAlign: 'center' },
  subtitle: { fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#f9f9f9'
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    alignItems: 'center',
    backgroundColor: '#fafafa'
  },
  cardTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  image: { width: 200, height: 150, marginTop: 5, backgroundColor: '#eee', borderRadius: 5 }
});