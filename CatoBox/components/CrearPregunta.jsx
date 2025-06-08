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
          style={[styles.input, { height: 100 }]}
          multiline
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? <Text style={styles.success}>{success}</Text> : null}
        <Button title="Publicar" color="black" onPress={handleSubmit} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  volver: {
    color: "blue",
    fontSize: 16,
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  success: {
    color: "green",
    textAlign: "center",
  },
});
