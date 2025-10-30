import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Alert, Image, Button } from 'react-native';
import { db } from '../api/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function DirectoryScreen({ route, navigation }) {
  const { nombreCentro } = route.params;
  const [negocios, setNegocios] = useState([]);

  const cargarNegocios = async () => {
    try {
      const col = collection(db, 'negocios');
      const q = query(col, where('plaza', '==', nombreCentro));
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
    const unsubscribe = navigation.addListener('focus', cargarNegocios);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.nombre}</Text>
      {item.imagenUrl ? (
        <Image
          source={{ uri: item.imagenUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#888' }}>Sin imagen</Text>
        </View>
      )}
      <Text style={styles.cardText}>Horario: {item.horario}</Text>
      <Text style={styles.cardText}>Estado: {item.estado}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Estás en {nombreCentro}</Text>

      <Button
        title="Agregar nuevo negocio"
        onPress={() => navigation.navigate('RegisterDirectory', { nombreCentro })}
      />

      <Text style={styles.subtitle}>Negocios en {nombreCentro}</Text>
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
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
    alignItems: 'center',
    backgroundColor: '#fafafa',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  cardText: { fontSize: 14, color: '#555', marginTop: 2 },
  image: { width: 220, height: 160, borderRadius: 8, backgroundColor: '#eee', marginBottom: 8 },
});
