import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Alert  } from "react-native";
import CentroCard from "../components/CentroCard";
import { ButtonRounded } from "../components"; // importacion nueva y de prueba aun
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../api/firebase";
import { useAuth } from "../context/AuthContext";

export default function MallSelection({ navigation }) {
  const [centros, setCentros] = useState([]);
  const {rol, user} = useAuth();

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

    Alert.alert(
      centro.nombre,
      "¿A dónde deseas ir?",
      [
        {
          text: "Ver Parqueo",

          onPress: () =>
            navigation.navigate("ParkingMap", { mallId: centro.id }),
        },

        {
          text: "Ir al Directorio",
          onPress: () =>
            navigation.navigate("Directory", { nombreCentro: centro.nombre }),
        },

        {
          text: "Cancelar",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text>{rol}</Text> */}
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

  {rol=="admin"? 
      <View style={{ padding: 20 }}>
        <ButtonRounded
          title="Agregar Nuevo Centro"
          onPress={() => navigation.navigate("RegisterMall")}
        />
      </View>
  :null}
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
