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
      {/* Botón de retroceso */}
      <Text style={styles.volver} onPress={() => router.back()}>
        ← Volver al foro
      </Text>

      <Text style={styles.titulo}>{pregunta.titulo}</Text>
      <Text style={styles.autor}>
        Autor: {pregunta.usuario?.nombres} {pregunta.usuario?.apaterno}
      </Text>
      <Text style={styles.fecha}>
        Publicado el: {new Date(pregunta.fechapublicacion).toLocaleDateString()}
      </Text>
      <Text style={styles.contenido}>{pregunta.contenido}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  volver: {
    color: "blue",
    fontSize: 16,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  autor: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 4,
  },
  fecha: {
    fontSize: 12,
    color: "gray",
    marginBottom: 16,
  },
  contenido: {
    fontSize: 16,
    lineHeight: 22,
  },
  cargando: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
  },
});
