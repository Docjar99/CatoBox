import { Text, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Screen } from "../../components/Screen";
import { User } from "../../components/User";
import { useRouter } from "expo-router";

export default function PerfilUsuario() {
  const { id } = useLocalSearchParams();
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from("usuario")
        .select("nombres, apaterno, amaterno, carrera, semestre_carrera")
        .eq("id_usuario", id)
        .single();

      if (error) {
        console.error("Error al obtener datos del usuario:", error.message);
      } else {
        setUserData(data);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
      <Text style={styles.volver} onPress={() => router.back()}>
        ← Volver
      </Text>

        <View style={styles.avatar}>
          <User />
        </View>

        <View style={styles.card}>
          {userData ? (
            <>
              <Text style={styles.label}>Nombres</Text>
              <Text style={styles.value}>{userData.nombres}</Text>

              <Text style={styles.label}>Apellidos</Text>
              <Text style={styles.value}>
                {userData.apaterno} {userData.amaterno}
              </Text>

              <Text style={styles.label}>Carrera</Text>
              <Text style={styles.value}>{userData.carrera}</Text>

              <Text style={styles.label}>Semestre</Text>
              <Text style={styles.value}>{userData.semestre_carrera}</Text>
            </>
          ) : (
            <Text style={styles.loading}>Cargando...</Text>
          )}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    marginTop: 24,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#00bc70",
    fontWeight: "bold",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginTop: 4,
    textAlign: "center",
  },
  loading: {
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  volver: {
    alignSelf: "flex-start",
    color: "blue",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  
});
