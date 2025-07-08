import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Screen } from "./Screen";
import { supabase } from "../lib/supabase";
import { useRouter } from "expo-router";
import { seleccionarYSubirMedia } from "../lib/subirMedia";
import { Image } from "react-native";
import { Video } from 'expo-av';
import { Picker } from "@react-native-picker/picker";

export function CrearPregunta() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [mediaUrl, setMediaUrl] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [anioAuto, setAnioAuto] = useState("");
  

  const anios = ["1", "2", "3", "4", "5"];
  const cursoAnios = {
    "Gestión de Procesos de Negocio": "4",
    "Tecnologías Móviles": "4",
    "Interacción Humano-Computador": "4",
    "Sistemas Inteligentes": "4",
    "Estadística y Probabilidades": "3",
    "Cálculo": "1",
    "Física": "1",
    "Lenguajes de Programación I": "1",
    "Fundamentos de Sistemas de Información": "2",
    "Computación en Red I": "2",
    "Análisis y Diseño de Sistemas": "3",
    "Infraestructura de Tecnologías de la Información": "3",
    "Sistemas Operativos": "4",
    "Big Data": "5",
    "Auditoría de Sistemas": "5",
    "Seguridad Informática": "5",
    "Proyecto de Fin de Carrera": "5",
  };
  


  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!titulo || !contenido) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (!cursoSeleccionado || !anioAuto) {
      setError("Por favor selecciona un curso válido.");
      return;
    }
    

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError("No se pudo obtener el usuario autenticado.");
      return;
    }

    const { error: insertError } = await supabase
      .from("publicacionforo")
      .insert([{
        id_usuario: user.id,
        titulo,
        contenido,
        fechapublicacion: new Date(),
        estado: "activo",
        media_url: mediaUrl,
        media_type: mediaType,
        curso: cursoSeleccionado,
        anio: anioAuto,

      }]);

    if (insertError) {
      setError("Error al publicar: " + insertError.message);
    } else {
      setSuccess("¡Pregunta publicada exitosamente!");
      setTitulo("");
      setContenido("");
      setCursoSeleccionado("");
      setAnioAuto("");
      setTimeout(() => {
        requestAnimationFrame(() => {
          router.replace("/foro");
        });
      }, 1500);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.volver} onPress={() => router.back()}>
          ← Volver al foro
        </Text>

        <Text style={styles.header}>Publicar nueva pregunta</Text>

        <View style={styles.card}>
          <TextInput
            placeholder="Título de tu pregunta"
            value={titulo}
            onChangeText={setTitulo}
            style={styles.input}
          />
          <TextInput
            placeholder="Describe tu post aquí..."
            value={contenido}
            onChangeText={setContenido}
            style={[styles.input, styles.area]}
            multiline
          />

          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Año:</Text>
          <Picker
            selectedValue={cursoSeleccionado}
            onValueChange={(itemValue) => {
              setCursoSeleccionado(itemValue);
              const anioDetectado = cursoAnios[itemValue] || "";
              setAnioAuto(anioDetectado);
            }}
          >
            <Picker.Item label="Selecciona un curso" value="" />
            {Object.entries(cursoAnios).map(([curso, anio]) => (
            <Picker.Item
              key={curso}
              label={`${curso} (${anio}° año)`}
              value={curso}
            />
          ))}
          </Picker>

          <Text style={{ fontWeight: "bold", marginTop: 10 }}>Año detectado:</Text>
          <TextInput
            value={anioAuto}
            editable={false}
            style={[styles.input, { backgroundColor: "#eee" }]}
          />

          <Button
            title="Seleccionar imagen o video"
            onPress={async () => {
              setLoadingMedia(true); // empieza la carga
              const media = await seleccionarYSubirMedia();
              if (media) {
                setMediaUrl(media.media_url);
                setMediaType(media.media_type);
              }
              setLoadingMedia(false); // termina la carga
            }}
          />
                    {loadingMedia && (
            <Text style={{ textAlign: "center", color: "#555", marginVertical: 8 }}>
              Se está cargando tu imagen o video, por favor espera...
            </Text>
          )}

                    {mediaUrl && (
            <View style={{ marginTop: 10 }}>
              {mediaType === "image" ? (
                <Image
                  source={{ uri: mediaUrl }}
                  style={{ width: "100%", height: 200, borderRadius: 10 }}
                />
              ) : (
                <Video
                  source={{ uri: mediaUrl }}
                  useNativeControls
                  resizeMode="contain"
                  style={{ width: "100%", height: 300 }}
                />
              )}
            </View>
          )}

          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.success}>{success}</Text> : null}
         

          <Button title="Publicar" color="#00bc70" onPress={handleSubmit} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#ffffff",
    flex: 1,
  },
  volver: {
    color: "#1E88E5",
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "500",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#00bc70",
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
    gap: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  area: {
    height: 100,
    textAlignVertical: "top",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  success: {
    color: "green",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
});
