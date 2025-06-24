import { Alert,Button, Text, TextInput, StyleSheet, View } from "react-native";
import React, {useState} from 'react';


import { Screen } from "./Screen";
import { supabase } from "../lib/supabase";
import { Link } from "expo-router";
import { useRouter } from "expo-router";




export function Login(){
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[loading,setLoading]=useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();


    async function signInWithEmail() {
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
        setErrorMessage('Por favor completa todos los campos.');
        return;
    }

    if (!email.includes('@')) {
        setErrorMessage('Correo electrónico inválido.');
        return;
    }

    setLoading(true);
    try {
        const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
        });

        if (error) {
        setErrorMessage(error.message); // ERROR MENSAJE
        } else {
            setSuccessMessage('Inicio de sesión exitoso.');  // EEEEXITO
            setErrorMessage('');
            setTimeout(() => {
            router.replace("/foro");
            }, 1000);

        }
    } catch (err) {
        setErrorMessage('Error inesperado: ' + err.message);
    } finally {
        setLoading(false);
    }
    }


    return(
        <Screen>
        <View style={styles.container}>
            <Text style={styles.header}>Inicio de sesión</Text>

            <View style={styles.card}>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                onChangeText={(text) => setEmail(text)}
                value={email}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
                autoCapitalize="none"
            />

            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

            <Button
                title="Iniciar sesión"
                onPress={signInWithEmail}
                color="#00bc70"
                disabled={loading}
            />

            <Link href="/" style={styles.linkContainer}>
                <Text style={styles.link}>¿No tienes cuenta? Regístrate aquí</Text>
            </Link>
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
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00bc70",
    marginBottom: 20,
    textAlign: "center",
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
    gap: 14,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 6,
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
  linkContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  link: {
    color: "#1E88E5",
    textDecorationLine: "underline",
  },
});
