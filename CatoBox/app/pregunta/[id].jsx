import { useLocalSearchParams } from "expo-router";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function VerPregunta() {
  const { id } = useLocalSearchParams();
  const [pregunta, setPregunta] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Obtener pregunta
  useEffect(() => {
    const obtenerPregunta = async () => {
      const { data, error } = await supabase
        .from("publicacionforo")
        .select("titulo, contenido, fechapublicacion, usuario(nombres, apaterno)")
        .eq("id_publicacionforo", id)
        .single();
      if (!error) setPregunta(data);
    };
    if (id) obtenerPregunta();
  }, [id]);

  // Obtener comentarios
  useEffect(() => {
    const obtenerComentarios = async () => {
      const { data, error } = await supabase
        .from("comentariopublicacion")
        .select("contenido, fecha, usuario(nombres, apaterno)")
        .eq("id_publicacion", id)
        .order("fecha", { ascending: true });
      if (!error) setComentarios(data);
    };
    if (id) obtenerComentarios();
  }, [id]);

  const publicarComentario = async () => {
    setError("");
    if (!nuevoComentario.trim()) {
      setError("El comentario no puede estar vacío.");
      return;
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError("Error al obtener el usuario.");
      return;
    }

    const { error: insertError } = await supabase
      .from("comentariopublicacion")
      .insert({
        id_publicacion: id,
        id_usuario: user.id,
        contenido: nuevoComentario,
        fecha: new Date(),
        activo: true,
      });

    if (insertError) {
      setError("Error al publicar el comentario.");
    } else {
      setNuevoComentario("");
      // Refrescar comentarios
      const { data } = await supabase
        .from("comentariopublicacion")
        .select("contenido, fecha, usuario(nombres, apaterno)")
        .eq("id_publicacion", id)
        .order("fecha", { ascending: true });
      setComentarios(data);
    }
  };

  if (!pregunta) {
    return <Text style={styles.cargando}>Cargando pregunta...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

      <Text style={styles.subtitulo}>Comentarios</Text>
      {comentarios.length === 0 ? (
        <Text style={styles.noComentarios}>Aún no hay comentarios.</Text>
      ) : (
        comentarios.map((c, index) => (
          <View key={index} style={styles.comentario}>
            <Text style={styles.comAutor}>
              {c.usuario?.nombres} {c.usuario?.apaterno}
            </Text>
            <Text style={styles.comFecha}>
              {new Date(c.fecha).toLocaleDateString()}
            </Text>
            <Text>{c.contenido}</Text>
          </View>
        ))
      )}

      <TextInput
        placeholder="Escribe un comentario..."
        value={nuevoComentario}
        onChangeText={setNuevoComentario}
        style={styles.input}
        multiline
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Comentar" onPress={publicarComentario} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  volver: {
    color: "blue",
    marginBottom: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
  },
  autor: {
    fontSize: 14,
    fontStyle: "italic",
  },
  fecha: {
    fontSize: 12,
    color: "gray",
    marginBottom: 10,
  },
  contenido: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  comentario: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 6,
  },
  comAutor: {
    fontWeight: "bold",
  },
  comFecha: {
    fontSize: 11,
    color: "#666",
  },
  noComentarios: {
    fontStyle: "italic",
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    minHeight: 60,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  cargando: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
  },
});
