import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CentroCard from "../components/CentroCard";
import { ButtonRounded } from "../components"; // importacion nueva y de prueba aun
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../api/firebase";

export default function MallSelection({ navigation }) {
  const [centros, setCentros] = useState([]);

  useEffect(() => {
    const fetchCentros = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "centrosComerciales")
        );
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCentros(lista); //  actualiza la lista de centros
      } catch (error) {
        console.log("Error al traer centros:", error);
      }
    };

    fetchCentros();
  }, []);

  const handlePress = (centro) => {
    console.log("Centro seleccionado:", centro.nombre);
    navigation.navigate("Directory", { nombreCentro: centro.nombre });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={centros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CentroCard
            imagen={item.imagenUrl}
            nombre={item.nombre}
            descripcion={item.descripcion}
            onPress={() => handlePress(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Botón para ir a RegisterMallScreen */}

      <View style={{ padding: 20 }}>
        <ButtonRounded
          title="Agregar Nuevo Centro"
          onPress={() => navigation.navigate("RegisterMall")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingVertical: 10,
  },
});
