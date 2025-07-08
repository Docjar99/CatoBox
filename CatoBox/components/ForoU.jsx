import { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { supabase } from "../lib/supabase";
import { Picker } from "@react-native-picker/picker";

export function ForoU() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [filtroAnio, setFiltroAnio] = useState("");
  const [filtroCurso, setFiltroCurso] = useState("");
  
  
  const anios = ["1", "2", "3", "4", "5"];
  const cursos = [
    "Gestión de procesos de negocios",
    "Tecnologías móviles",
    "Interacción Humano-Computador",
    "Sistemas Inteligentes",
    "General",
  ];
  
  const agruparPorAnio = (publicaciones) => {
    return publicaciones.reduce((grupo, pub) => {
      const anio = pub.anio || "Sin año";
      if (!grupo[anio]) grupo[anio] = [];
      grupo[anio].push(pub);
      return grupo;
    }, {});
  };
  

  const cargarPublicaciones = async () => {
    let query = supabase
      .from("publicacionforo")
      .select("id_publicacionforo, titulo, fechapublicacion, anio, curso, usuario(nombres, apaterno, id_usuario)")
      .order("fechapublicacion", { ascending: false });
  
    if (filtroAnio) query = query.eq("anio", filtroAnio);
    if (filtroCurso) query = query.eq("curso", filtroCurso);
  
    const { data, error } = await query;
  
    if (error) {
      console.error("Error al obtener publicaciones:", error);
    } else {
      setPublicaciones(data);
    }
  };
  

  //  Recarga cada vez que se enfoca la vista
  useFocusEffect(
    useCallback(() => {
      cargarPublicaciones();
    }, [])
  );

  // También carga inicialmente al montar el componente
  useEffect(() => {
    cargarPublicaciones();
  }, [filtroAnio, filtroCurso]);
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Foro estudiantil</Text>

      <Link href="/crearPregunta">
        <Text style={styles.link}>+ Nueva pregunta</Text>
      </Link>

      <Text style={{ marginTop: 10, fontWeight: "bold" }}>Año:</Text>
      <Picker
        selectedValue={filtroAnio}
        onValueChange={(itemValue) => setFiltroAnio(itemValue)}
      >
        <Picker.Item label="Selecciona un año" value="" />
        {anios.map((a) => (
          <Picker.Item label={`Año ${a}`} value={a} key={a} />
        ))}
      </Picker>

      <Text style={{ marginTop: 10, fontWeight: "bold" }}>Curso:</Text>
      <Picker
        selectedValue={filtroCurso}
        onValueChange={(itemValue) => setFiltroCurso(itemValue)}
      >
        <Picker.Item label="Selecciona un curso" value="" />
        {cursos.map((c) => (
          <Picker.Item label={c} value={c} key={c} />
        ))}
      </Picker>
      <Text
        onPress={() => {
          setFiltroAnio("");
          setFiltroCurso("");
        }}
        style={{ color: "blue", textDecorationLine: "none",marginTop: 10, marginBottom: 10 }}
      >
        Limpiar filtros
      </Text>

      {publicaciones.length === 0 ? (
  <Text style={styles.noData}>No hay publicaciones.</Text>
) : (
  Object.entries(agruparPorAnio(publicaciones)).map(([anio, posts]) => (
    <View key={anio}>
      <Text style={styles.seccionTitulo}>Año {anio}</Text>
      {posts.map((p) => (
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
          <Text style={styles.curso}>{p.curso}</Text>
        </View>
      ))}
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
  seccionTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 6,
    color: "#388E3C", // verde oscuro
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 4,
  },
  curso: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  
});
