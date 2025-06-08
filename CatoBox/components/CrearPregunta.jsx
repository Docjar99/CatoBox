import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Screen } from "./Screen";
import { supabase } from "../lib/supabase";
import { useRouter } from "expo-router";

export function CrearPregunta() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!titulo || !contenido) {
      setError("Por favor completa todos los campos.");
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
        estado: "activo"
      }]);

    if (insertError) {
      setError("Error al publicar: " + insertError.message);
    } else {
      setSuccess("¡Pregunta publicada exitosamente!");
      setTitulo("");
      setContenido("");
      setTimeout(() => router.replace("/foro"), 1500);
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
