import { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { supabase } from "../lib/supabase";

export function ForoU() {
  const [publicaciones, setPublicaciones] = useState([]);

  const cargarPublicaciones = async () => {
    const { data, error } = await supabase
      .from("publicacionforo")
      .select("id_publicacionforo, titulo, fechapublicacion, usuario(nombres, apaterno, id_usuario)")
      .order("fechapublicacion", { ascending: false });

    if (error) {
      console.error("Error al obtener publicaciones:", error);
    } else {
      setPublicaciones(data);
    }
  };

  // 🔁 Recarga cada vez que se enfoca la vista
  useFocusEffect(
    useCallback(() => {
      cargarPublicaciones();
    }, [])
  );

  // También carga inicialmente al montar el componente
  useEffect(() => {
    cargarPublicaciones();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Foro estudiantil</Text>

      <Link href="/crearPregunta">
        <Text style={styles.link}>+ Nueva pregunta</Text>
      </Link>

      {publicaciones.length === 0 ? (
        <Text style={styles.noData}>No hay publicaciones.</Text>
      ) : (
        publicaciones.map((p) => (
          <View key={p.id_publicacionforo} style={styles.card}>
            <Link href={`/pregunta/${p.id_publicacionforo}`}>
              <Text style={styles.pregunta}>{p.titulo}</Text>
            </Link>
            <Text style={styles.autor}>
              {p.usuario?.nombres} {p.usuario?.apaterno}
            </Text>
            <Text style={styles.fecha}>
              {new Date(p.fechapublicacion).toLocaleDateString()}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#00bc70", // verde oscuro
    textAlign: "center",
  },
  link: {
    backgroundColor: "#66BB6A", // verde más claro
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pregunta: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32", // texto verde más fuerte
  },
  autor: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  fecha: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  noData: {
    fontStyle: "italic",
    color: "gray",
    textAlign: "center",
    marginTop: 40,
  },
});
