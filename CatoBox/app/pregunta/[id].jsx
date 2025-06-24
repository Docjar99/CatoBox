import { useLocalSearchParams } from "expo-router";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";


export default function VerPregunta() {
  const { id } = useLocalSearchParams();
  const [pregunta, setPregunta] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null); // 🔒 nuevo
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Usuario actual:", user?.id);
      setUserId(user?.id); // 🔒 guardar en estado
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const obtenerPregunta = async () => {
      const { data, error } = await supabase
        .from("publicacionforo")
        .select("id_usuario, titulo, contenido, fechapublicacion, usuario(nombres, apaterno)")
        .eq("id_publicacionforo", id)
        .single();

      if (error) {
        console.error("Error al obtener pregunta:", error.message);
      } else {
        setPregunta(data);
      }
    };

    if (id) obtenerPregunta();
  }, [id]);

  const refetchComentarios = async () => {
    const { data, error } = await supabase
      .from("comentariopublicacion")
      .select("id_comentario, id_usuario, contenido, fecha, usuario(nombres, apaterno)")
      .eq("id_publicacion", id)
      .order("fecha", { ascending: true });

    if (error) {
      console.error("Error al obtener comentarios:", error.message);
    } else {
      setComentarios(data);
    }
  };

  useEffect(() => {
    if (id) refetchComentarios();
  }, [id]);

  const publicarComentario = async () => {
    setError("");
    if (!nuevoComentario.trim()) {
      setError("El comentario no puede estar vacío.");
      return;
    }

    if (!userId) {
      setError("No se pudo obtener el usuario.");
      return;
    }

    const { error: insertError } = await supabase.from("comentariopublicacion").insert({
      id_publicacion: id,
      id_usuario: userId,
      contenido: nuevoComentario,
      fecha: new Date(),
      activo: true,
    });

    if (insertError) {
      setError("Error al publicar el comentario.");
    } else {
      setNuevoComentario("");
      refetchComentarios();
    }
  };

  const eliminarPublicacion = async () => {
    Alert.alert(
      "¿Eliminar publicación?",
      "Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase
              .from("publicacionforo")
              .delete()
              .eq("id_publicacionforo", id)
              .eq("id_usuario", userId); // opcional para seguridad extra
  
            if (error) {
              Alert.alert("Error", "No se pudo eliminar la publicación.");
              console.error("Error al eliminar publicación:", error.message);
            } else {
              router.back(); // vuelve al foro
            }
          },
        },
      ]
    );
  };
  
  // 🔒 Función para eliminar comentario
  const eliminarComentario = async (id_comentario) => {
    console.log("Eliminando comentario:", id_comentario);

    const { error } = await supabase
      .from("comentariopublicacion")
      .delete()
      .eq("id_comentario", id_comentario);

    if (error) {
      console.error("Error al eliminar comentario:", error.message);
    } else {
      console.log("Comentario eliminado con éxito");
      refetchComentarios();
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
  
      {/* 🔒 Mostrar opción para eliminar publicación si es el autor */}
      {userId === pregunta.id_usuario && (
        <Text
          style={styles.eliminarTexto}
          onPress={() =>
            Alert.alert(
              "¿Eliminar publicación?",
              "Esta acción eliminará también todos los comentarios.",
              [
                { text: "Cancelar", style: "cancel" },
                {
                  text: "Eliminar",
                  style: "destructive",
                  onPress: async () => {
                    const { error } = await supabase
                      .from("publicacionforo")
                      .delete()
                      .eq("id_publicacionforo", id)
                      .eq("id_usuario", userId);
  
                    if (error) {
                      Alert.alert("Error", "No se pudo eliminar la publicación.");
                    } else {
                      router.back();
                    }
                  },
                },
              ]
            )
          }
        >
          Eliminar publicación
        </Text>
      )}
  
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
  
            {/* 🔒 Mostrar solo si es del autor */}
            {userId === c.id_usuario && (
              <Text
                style={styles.eliminarTexto}
                onPress={() =>
                  Alert.alert(
                    "¿Eliminar comentario?",
                    "Esta acción no se puede deshacer.",
                    [
                      { text: "Cancelar", style: "cancel" },
                      {
                        text: "Eliminar",
                        style: "destructive",
                        onPress: () => eliminarComentario(c.id_comentario),
                      },
                    ]
                  )
                }
              >
                Eliminar
              </Text>
            )}
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
  container: { padding: 20, gap: 12 },
  volver: { color: "blue", marginBottom: 10 },
  titulo: { fontSize: 24, fontWeight: "bold" },
  autor: { fontSize: 14, fontStyle: "italic" },
  fecha: { fontSize: 12, color: "gray", marginBottom: 10 },
  contenido: { fontSize: 16, lineHeight: 22, marginBottom: 20 },
  subtitulo: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  comentario: { backgroundColor: "#f0f0f0", padding: 10, marginVertical: 5, borderRadius: 6 },
  comAutor: { fontWeight: "bold" },
  comFecha: { fontSize: 11, color: "#666" },
  noComentarios: { fontStyle: "italic", color: "gray" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 6, minHeight: 60 },
  error: { color: "red", textAlign: "center" },
  cargando: { padding: 20, textAlign: "center", fontSize: 16, color: "gray" },
  eliminarTexto: {
    color: "red",
    textDecorationLine: "underline",
    fontSize: 12,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  
});
