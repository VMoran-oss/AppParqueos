import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import { Layout, ButtonRounded } from "../components";

export default function RegisterDirectoryScreen({ route, navigation }) {
  const { nombreCentro } = route.params;

  const [nombre, setNombre] = useState("");
  const [horario, setHorario] = useState("");
  const [estado, setEstado] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const guardarNegocio = async () => {
    if (!nombre || !horario || !estado || !imagenUrl) {
      Alert.alert("Error", "Por favor complete todos los campos");
      return;
    }

    try {
      await addDoc(collection(db, "negocios"), { 
        nombre,
        horario,
        estado,
        imagenUrl,
        plaza: nombreCentro, 
      });

      Alert.alert("Éxito", "Negocio guardado");
      setNombre("");
      setHorario("");
      setEstado("");
      setImagenUrl("");

      // Volver a la pantalla anterior en vez de navigate
      navigation.goBack();
    } catch (error) {
      console.log("Error al guardar:", error);
      Alert.alert("Error", "No se pudo guardar el negocio");
    }
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Agregar Nuevo negocio</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Eje: Burger King"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Imagen (URL)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: https://..."
          value={imagenUrl}
          onChangeText={setImagenUrl}
        />

        <Text style={styles.label}>Horario</Text>
        <TextInput
          style={styles.input}
          placeholder=" Ej: 9:00am a 9:00pm"
          value={horario}          
          onChangeText={setHorario} 
        />

        <Text style={styles.label}>Estado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Abierto / Cerrado"
          value={estado}          
          onChangeText={setEstado}  
        />

        <ButtonRounded title="Guardar Negocio" onPress={guardarNegocio} />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
});
