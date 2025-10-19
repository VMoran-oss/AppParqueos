import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
import CentroCard from "./components/CentroCard";

export default function CentroCard({ imagen, nombre, descripcion, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={imagen} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.descripcion}>{descripcion}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 12,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E3A8A", 
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 14,
    color: "#555",
  },
});
