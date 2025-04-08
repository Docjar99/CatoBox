import { StatusBar } from "expo-status-bar";
import {View, Text, Pressable, StyleSheet, ScrollView} from "react-native";
import { Screen } from "./Screen";
import PreguntaFila from "./PreguntaFila";

const preguntas = [
  { id: "1", titulo: "¿Las fijas de GDI?", autor: "Paolo Remos", fecha: "2025-04-07" },
  { id: "2", titulo: "Integrales", autor: "Wissin", fecha: "2025-04-07" },
];

export function Main() {
  return (
    <Screen>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={styles.encabezado}>Preguntas del Foro</Text>
        <View style={styles.tabla}>
          <View style={styles.header}>
            <Text style={[styles.columna, styles.colTitulo]}>Título</Text>
            <Text style={[styles.columna, styles.colAutor]}>Autor</Text>
            <Text style={[styles.columna, styles.colFecha]}>Fecha</Text>
          </View>

          <ScrollView>
            {preguntas.map((p) => (
              <PreguntaFila key={p.id} pregunta={p} />
            ))}
          </ScrollView>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f4f8",
    flex: 1,
  },
  encabezado: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  tabla: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#d0e6d0",
    paddingVertical: 8,
    paddingHorizontal: 4,

  },
  columna: {
    fontWeight: "bold",
    fontSize: 14,
  },
  colTitulo: {
    flex: 2,
  },
  colAutor: {
    flex: 1.2,
  },
  colFecha: {
    flex: 1,
  },
});
