import { useLocalSearchParams } from "expo-router";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Pressable } from "react-native";
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
  const [comentarioEditandoId, setComentarioEditandoId] = useState(null);
  const [contenidoEditado, setContenidoEditado] = useState("");
  const [editandoPost, setEditandoPost] = useState(false);
  const [contenidoPostEditado, setContenidoPostEditado] = useState("");
  const [tituloPostEditado, setTituloPostEditado] = useState("");


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

  const guardarEdicionComentario = async () => {
    if (!contenidoEditado.trim()) {
      Alert.alert("El contenido no puede estar vacío.");
      return;
    }
  
    const { error } = await supabase
      .from("comentariopublicacion")
      .update({ contenido: contenidoEditado })
      .eq("id_comentario", comentarioEditandoId);
  
    if (error) {
      Alert.alert("Error al guardar los cambios");
      console.error(error.message);
    } else {
      setComentarioEditandoId(null);
      setContenidoEditado("");
      refetchComentarios();
    }
  };
  
  const guardarEdicionPost = async () => {
    if (!tituloPostEditado.trim() || !contenidoPostEditado.trim()) {
      Alert.alert("El título y el contenido no pueden estar vacíos.");
      return;
    }
  
    const { error } = await supabase
      .from("publicacionforo")
      .update({
        titulo: tituloPostEditado,
        contenido: contenidoPostEditado
      })
      .eq("id_publicacionforo", id);
  
    if (error) {
      Alert.alert("Error", "No se pudo guardar la edición.");
      console.error(error.message);
    } else {
      setEditandoPost(false);
      setTituloPostEditado("");
      setContenidoPostEditado("");
      const { data } = await supabase
        .from("publicacionforo")
        .select("id_usuario, titulo, contenido, fechapublicacion, usuario(nombres, apaterno)")
        .eq("id_publicacionforo", id)
        .single();
      setPregunta(data);
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
  
      {editandoPost ? (
        <TextInput
          value={tituloPostEditado}
          onChangeText={setTituloPostEditado}
          style={[styles.input, { fontSize: 20, fontWeight: "bold" }]}
        />
      ) : (
        <Text style={styles.titulo}>{pregunta.titulo}</Text>
      )}

      <Text style={styles.autor}>
        Autor: {pregunta.usuario?.nombres} {pregunta.usuario?.apaterno}
      </Text>
      <Text style={styles.fecha}>
        Publicado el: {new Date(pregunta.fechapublicacion).toLocaleDateString()}
      </Text>
      {editandoPost ? (
  <>
    <TextInput
      value={contenidoPostEditado}
      onChangeText={setContenidoPostEditado}
      style={styles.input}
      multiline
    />
    <View style={{ flexDirection: "row", gap: 10 }}>
      <Text style={styles.textoAccionAzul} onPress={guardarEdicionPost}>
        Guardar
      </Text>
      <Text
        style={styles.eliminarTexto}
        onPress={() => {
          setEditandoPost(false);
          setContenidoPostEditado("");
        }}
      >
        Cancelar
      </Text>
    </View>
  </>
) : (
  <>
    <Text style={styles.contenido}>{pregunta.contenido}</Text>
    {userId === pregunta.id_usuario && (
      <View style={{ flexDirection: "row", gap: 10 }}>
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
        <Text
          style={styles.textoAccionAzul}
          onPress={() => {
            setEditandoPost(true);
            setTituloPostEditado(pregunta.titulo);
            setContenidoPostEditado(pregunta.contenido);
          }}
        >
          Editar publicación
        </Text>
      </View>
    )}
  </>
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
        
            {comentarioEditandoId === c.id_comentario ? (
              <>
                <TextInput
                  value={contenidoEditado}
                  onChangeText={setContenidoEditado}
                  style={styles.input}
                  multiline
                />
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Text style={styles.textoAccionAzul} onPress={guardarEdicionComentario}>
                    Guardar
                  </Text>
                  <Text
                    style={styles.eliminarTexto}
                    onPress={() => {
                      setComentarioEditandoId(null);
                      setContenidoEditado("");
                    }}
                  >
                    Cancelar
                  </Text>
                </View>
              </>
            ) : (
              <>
                <Text>{c.contenido}</Text>
        
                {userId === c.id_usuario && (
                  <View style={{ flexDirection: "row", gap: 10 }}>
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
                    <Text
                      style={styles.textoAccionAzul}
                      onPress={() => {
                        setComentarioEditandoId(c.id_comentario);
                        setContenidoEditado(c.contenido);
                      }}
                    >
                      Editar
                    </Text>
                  </View>
                )}
              </>
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
      <Pressable style={styles.botonVerde} onPress={publicarComentario}>
  <Text style={styles.textoBotonVerde}>Comentar</Text>
</Pressable>

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

  textoAccionAzul: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 12,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  
  botonVerde: {
    backgroundColor: "#006400", // verde oscuro
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  
  textoBotonVerde: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  
});
