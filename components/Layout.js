import { StyleSheet, StatusBar, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout({ children }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} >
        <StatusBar barStyle="light-content" backgroundColor="#0051caff" />
        <View style={styles.body} >
            {children}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo el espacio.
    backgroundColor: "#f5f5f5", // Fondo gris claro.
    justifyContent: "center", // Centra el contenido verticalmente.
    alignItems: "stretch", // estira el contenido horizontalmente.
  },
  body: {
    flex: 1, // Ocupa el espacio restante.
    justifyContent: "top", // Alinea el contenido arriba.
    alignItems: "left", // Alinea el contenido a la izquierda.
    padding: 5, // Agrega un relleno de 5px.
  },
});