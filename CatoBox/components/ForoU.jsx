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
  },
  link: {
    color: "blue",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#eee",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  pregunta: {
    fontSize: 16,
    fontWeight: "bold",
  },
  autor: {
    fontSize: 14,
    color: "#444",
  },
  fecha: {
    fontSize: 12,
    color: "#666",
  },
  noData: {
    fontStyle: "italic",
    color: "gray",
    textAlign: "center",
  },
});
