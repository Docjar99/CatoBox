import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function VerPregunta() {
  const { id } = useLocalSearchParams();
  const [pregunta, setPregunta] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const obtenerPregunta = async () => {
      const { data, error } = await supabase
        .from("publicacionforo")
        .select("titulo, contenido, fechapublicacion, usuario(nombres, apaterno)")
        .eq("id_publicacionforo", id)
        .single();

      if (error) {
        console.error("Error al obtener la pregunta:", error);
      } else {
        setPregunta(data);
      }
    };

    if (id) obtenerPregunta();
  }, [id]);

  if (!pregunta) {
    return <Text style={styles.cargando}>Cargando pregunta...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.volver} onPress={() => router.back()}>
        ← Volver al foro
      </Text>

      <View style={styles.card}>
        <Text style={styles.titulo}>{pregunta.titulo}</Text>
        <Text style={styles.autor}>
          Autor: {pregunta.usuario?.nombres} {pregunta.usuario?.apaterno}
        </Text>
        <Text style={styles.fecha}>
          Publicado el: {new Date(pregunta.fechapublicacion).toLocaleDateString()}
        </Text>
        <Text style={styles.contenido}>{pregunta.contenido}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
    flexGrow: 1,
  },
  volver: {
    color: "#1E88E5", // azul medio
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "500",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00bc70",
    marginBottom: 12,
    textAlign: "center",
  },
  autor: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 4,
    textAlign: "center",
  },
  fecha: {
    fontSize: 12,
    color: "#888",
    marginBottom: 16,
    textAlign: "center",
  },
  contenido: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    textAlign: "justify",
  },
  cargando: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

});
