import { Text, StyleSheet, View } from "react-native";
import { Screen } from "./Screen";
import { User } from "./User";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function UserInfo() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("No se pudo obtener el usuario autenticado");
        return;
      }

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

  return (
    <Screen>
      <View style={styles.foto}>
        <User />
      </View>
      <View style={styles.info}>
        {userData ? (
          <>
            <Text>Nombres: {userData.nombres}</Text>
            <Text>Apellidos: {userData.apaterno} {userData.amaterno}</Text>
            <Text>Carrera: {userData.carrera}</Text>
            <Text>Semestre: {userData.semestre_carrera}</Text>
          </>
        ) : (
          <Text>Cargando perfil...</Text>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  foto: {
    margin: 15,
    alignItems: "center",
  },
  info: {
    alignItems: "center",
  },
});
