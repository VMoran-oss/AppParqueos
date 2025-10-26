import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CentroCard from "../components/CentroCard";
import { centros } from "../services/centrosData";
import { ButtonRounded } from "../components"; // importacion nueva y de prueba aun

export default function MallSelection({ navigation }) {
  const handlePress = (centro) => {
    console.log("Centro seleccionado:", centro.nombre);
    navigation.navigate("Directory", { id: centro.id });
    // navigation.navigate("Parking Map", { id: centro.id });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={centros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CentroCard
            imagen={item.imagen}
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
