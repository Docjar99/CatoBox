import { Text, StyleSheet, View, Pressable, Alert } from "react-native";
import { Screen } from "./Screen";
import { User } from "./User";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "expo-router";

export function UserInfo() {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("No se pudo obtener el usuario autenticado");
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from("usuario")
        .select("nombres, apaterno, amaterno, carrera, semestre_carrera")
        .eq("id_usuario", user.id)
        .single();

      if (error) {
        console.error("Error al obtener los datos del perfil:", error.message);
      } else {
        setUserData(data);
      }
    };


    fetchUserData();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", "No se pudo cerrar sesión.");
    } else {
      router.replace("/login");
    }
  };

  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const obtenerNotificaciones = async () => {
      if (!userId) return;
      const { data, error } = await supabase
        .from("notificacion")
        .select("contenido, fecha, id_publicacion")
        .eq("id_destinatario", userId)
        .eq("leida", false)
        .order("fecha", { ascending: false });

      if (!error) setNotificaciones(data);
    };

    obtenerNotificaciones();
  }, [userId]);


  return (
    <Screen>
      <View style={styles.container}>
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
            <Text style={styles.loading}>Cargando perfil...</Text>
          )}
        </View>
        <Text style={styles.label}>🔔 Historial de notificaciones</Text>
        {notificaciones.length > 0 ? (
          <View style={styles.notificacionesBox}>
            {notificaciones.map((n, i) => (
              <View key={i} style={styles.notificacionItem}>
                <Text style={styles.notifTexto}>{n.contenido}</Text>
                <Text style={styles.notifFecha}>
                  {new Date(n.fecha).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.notifTexto}>No tienes notificaciones por ahora.</Text>
        )}




        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
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
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#00bc70",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

notificacionesBox: {
  marginTop: 20,
  width: "100%",
  backgroundColor: "#eef6f2",
  borderRadius: 8,
  padding: 10,
},

notificacionItem: {
  borderBottomWidth: 1,
  borderBottomColor: "#ddd",
  paddingVertical: 8,
},

notifTexto: {
  fontSize: 14,
  color: "#333",
},

notifFecha: {
  fontSize: 12,
  color: "#777",
  marginTop: 2,
},

});
