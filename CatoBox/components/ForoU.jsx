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
  const cursoAnios = {
    "General": "", // General no tiene año
    "Análisis y Diseño de Sistemas": "3",
    "Auditoría de Sistemas": "5",
    "Big Data": "5",
    "Cálculo": "1",
    "Computación en Red I": "2",
    "Estadística y Probabilidades": "3",
    "Física": "1",
    "Fundamentos de Sistemas de Información": "2",
    "Gestión de Procesos de Negocio": "4",
    "Infraestructura de Tecnologías de la Información": "3",
    "Interacción Humano-Computador": "4",
    "Lenguajes de Programación I": "1",
    "Proyecto de Fin de Carrera": "5",
    "Tecnologías Móviles": "4",
    "Seguridad Informática": "5",
    "Sistemas Inteligentes": "4",
    "Sistemas Operativos": "4",
  };

  const cursosFiltrados = Object.entries(cursoAnios).filter(
    ([curso, anio]) => !filtroAnio || anio === filtroAnio || curso === "General"
  );

  const agruparPorAnio = (publicaciones = []) => {
    return publicaciones.reduce((grupo, pub) => {
      const anio = pub.anio || "General";
      if (!grupo[anio]) grupo[anio] = [];
      grupo[anio].push(pub);
      return grupo;
    }, {});
  };

  const grupos = agruparPorAnio(publicaciones);

  const ordenAnio = Object.keys(grupos).sort((a, b) => {
    if (a === "General") return -1;
    if (b === "General") return 1;
    return parseInt(a) - parseInt(b);
  });

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
      setPublicaciones([]);
    } else {
      setPublicaciones(data || []);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarPublicaciones();
    }, [])
  );

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
        onValueChange={(itemValue) => {
          setFiltroAnio(itemValue);
          setFiltroCurso("");
          cargarPublicaciones();
        }}
      >
        <Picker.Item label="Selecciona un año" value="" enabled={false}/>
        {anios.map((a) => (
          <Picker.Item label={`Año ${a}`} value={a} key={a} />
        ))}
      </Picker>

      <Text style={{ marginTop: 10, fontWeight: "bold" }}>Curso:</Text>
      <Picker
        selectedValue={filtroCurso}
        onValueChange={(itemValue) => {
          setFiltroCurso(itemValue);
          const anioDetectado = cursoAnios[itemValue] || "";
          setFiltroAnio(anioDetectado);
          cargarPublicaciones();
        }}
      >
        <Picker.Item label="Selecciona un curso" value="" enabled={false}/>
        {cursosFiltrados.map(([curso]) => (
          <Picker.Item label={curso} value={curso} key={curso} />
        ))}
      </Picker>

      <Text
        onPress={() => {
          setFiltroAnio("");
          setFiltroCurso("");
        }}
        style={{ color: "blue", textDecorationLine: "none", marginTop: 10, marginBottom: 10 }}
      >
        Limpiar filtros
      </Text>

      {publicaciones.length === 0 ? (
        <Text style={styles.noData}>No hay publicaciones.</Text>
      ) : (
        ordenAnio.map((anio) => (
          <View key={anio}>
            <Text style={styles.seccionTitulo}>
              {anio === "General" ? "General" : `Año ${anio}`}
            </Text>

            {grupos[anio].map((p) => (
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
    color: "#00bc70",
    textAlign: "center",
  },
  link: {
    backgroundColor: "#66BB6A",
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
    color: "#2E7D32",
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
    color: "#388E3C",
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
