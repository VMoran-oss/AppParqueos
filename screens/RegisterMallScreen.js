import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import { Layout, ButtonRounded } from "../components";

export default function RegisterMallScreen({navigation}) {
 const[nombre, setNombre] = useState("");
 const[imagenUrl, setImagenUrl] = useState("");
 const[descripcion, setDescripcion] = useState("");

 const guardarCentro = async() => {
    if( !nombre || !imagenUrl || !descripcion){
        Alert.alert("Error","Por favor complete todos los campos");
        return;

    }

    try{
     await addDoc(collection(db, "centrosComerciales"),{
      nombre,
      imagenUrl,
      descripcion   
     });
     
     Alert.alert("Exito", "Centro comercial guardado");
     setNombre("");
     setImagenUrl("");
     setDescripcion("");

    navigation.navigate("MallSelection");
     }catch(error){
        console.log("Error al guardar:",error);
            Alert.alert("Error","No se pudo guardar el Centro comercial");
     }
};

return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Agregar Centro Comercial</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Metrocentro San Salvador"
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

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escribe una breve descripción"
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
        />

        <ButtonRounded title="Guardar Centro" onPress={guardarCentro} />
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
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});