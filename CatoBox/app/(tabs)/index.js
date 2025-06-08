import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { supabase } from "../../lib/supabase";

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/register");
      }
    };
    checkSession();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Bienvenido a CatoBox</Text>
        <Text style={styles.text}>
          CatoBox es una plataforma de foro estudiantil diseñada para que compartas ideas,
          resuelvas dudas, publiques preguntas y conectes con otros estudiantes.
        </Text>
        <Text style={styles.text}>
          Explora el foro, publica tus propias preguntas y conoce estudiantes de otras carreras.
          ¡La comunidad está creciendo!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00bc70",
    marginBottom: 16,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 22,
  },
});
