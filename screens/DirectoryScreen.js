import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const negociosPorCentro = {
  'Metrocentro': [
    { id: '1', nombre: 'Moda Express', descripcion: '20% de descuento en tu primera compra', abierto: true },
    { id: '2', nombre: 'El Sabor Latino', descripcion: 'Happy Hour de 5 a 7 PM', abierto: false },
    { id: '3', nombre: 'Calzado Elegante', descripcion: 'Oferta especial: 2x1 en zapatos', abierto: true },
    { id: '4', nombre: 'Accesorios Chic', descripcion: 'Descuento del 15% en accesorios', abierto: true },
  ],
  'Multiplaza': [
    { id: '1', nombre: 'Café Aroma', descripcion: '2x1 en capuchinos', abierto: true },
    { id: '2', nombre: 'TechZone', descripcion: 'Descuentos en gadgets', abierto: false },
  ],
  'Galerías Mall': [
    { id: '1', nombre: 'SportWorld', descripcion: 'Hasta 30% en ropa deportiva', abierto: true },
    { id: '2', nombre: 'CineStar', descripcion: 'Entradas 2x1 los miércoles', abierto: true },
  ], 
  'Plaza Central': [
    { id: '1', nombre: 'Panadería Dulce Hogar', descripcion: 'Pan recién hecho todo el día', abierto: true },
    { id: '2', nombre: 'Librería Ideas', descripcion: 'Nuevos lanzamientos con 10% off', abierto: false },
  ],
};

export default function DirectoryScreen({ route }) {
  const { centroSeleccionado } = route.params;
  const negocios = negociosPorCentro[centroSeleccionado] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{centroSeleccionado}</Text>
      <Text style={styles.subtitulo}>Directorio de negocios</Text>

      <FlatList
        data={negocios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={[styles.estado, { color: item.abierto ? 'green' : 'red' }]}>
                {item.abierto ? 'Abierto' : 'Cerrado'}
              </Text>
            </View>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  nombre: {
    fontSize: 18,
    fontWeight: '600',
  },
  descripcion: {
    color: '#555',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  estado: {
    fontWeight: 'bold',
  },
});