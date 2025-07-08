import { Alert, Button,Text, TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Screen } from "./Screen";
import { Link } from "expo-router";
import { EyeClosedIcon } from "./Icons";
import { PickerR } from "./PickerR";
import { PickerS } from "./PickerS";
import { CheckBoxx } from "./CheckBoxx";
import React, { useState } from "react";
import { supabase } from "../lib/supabase";

import {EyeOpenIcon} from "./Icons"

export function Register(){
    const[nombres, setNombres]= useState('')
    const[apaterno, setApaterno] = useState('')
    const[amaterno, setAmaterno] = useState('')
    const[carrera, setCarrera] = useState('')
    const[semestre_carrera, setSemestre] = useState('')

    const[email,setEmail] = useState('')
    const[password,setPassword]=useState('')
    const[confirm, setConfirm] = useState('')
    const[showPassword,setShowPassword]=useState(false)
    const[showConfirm,setShowConfirm]=useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const[loading,setLoading]=useState(false)
    
    async function signUpWithEmail() {
    setErrorMessage(''); // Limpiar errores anteriores

    // Validación de campos vacíos
    if (!nombres || !apaterno || !amaterno || !email || !password || !confirm || !carrera || !semestre_carrera) {
        setErrorMessage('Por favor completa todos los campos.');
        return;
    }

    // Validación de contraseña
    if (password !== confirm) {
        setErrorMessage('Las contraseñas deben coincidir.');
        return;
    }

    // Validación de formato de contraseña (mínimo)
    if (password.length < 8) {
        setErrorMessage('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

    // Validación de formato de correo
    if (!email.includes("@")) {
        setErrorMessage('Ingresa un correo electrónico válido.');
        return;
    }

    setLoading(true);

    try {
        const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        });

        if (signUpError) {
        setErrorMessage(signUpError.message); // ← Mostrar error de Supabase
        return;
        }

        const userId = data.user.id;

        const { error: insertError } = await supabase
        .from('usuario')
        .insert([{
            id_usuario: userId,
            nombres,
            apaterno,
            amaterno,
            email,
            carrera,
            semestre_carrera,
        }]);

        if (insertError) {
        setErrorMessage(insertError.message);
        } else {
            setSuccessMessage('Registro exitoso. Tu cuenta ha sido registrada correctamente.');
            setErrorMessage('');
        }

    } catch (error) {
        setErrorMessage('Error inesperado: ' + error.message);
    } finally {
        setLoading(false);
    }
    }
    
    return(
        <Screen>
        <View style={styles.container}>
            <Text style={styles.header}>Registro de estudiante</Text>

            <View style={styles.card}>
            <TextInput
                style={styles.input}
                placeholder="Apellido Paterno"
                onChangeText={(text) => setApaterno(text)}
                value={apaterno}
            />
            <TextInput
                style={styles.input}
                placeholder="Apellido Materno"
                onChangeText={(text) => setAmaterno(text)}
                value={amaterno}
            />
            <TextInput
                style={styles.input}
                placeholder="Nombres"
                onChangeText={(text) => setNombres(text)}
                value={nombres}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                onChangeText={(text) => setEmail(text)}
                value={email}
                autoCapitalize="none"
            />
            <View >
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Contraseña"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity 
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </TouchableOpacity>
            </View>
            
            <View>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirmar contraseña"
                    onChangeText={(text) => setConfirm(text)}
                    value={confirm}
                    secureTextEntry={!showConfirm}
                />
                <TouchableOpacity 
                    style={styles.eyeButton}
                    onPress={() => setShowConfirm(!showConfirm)}
                >
                    {showConfirm ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </TouchableOpacity>
            </View>

            <PickerR selectedValue={carrera} onValueChange={setCarrera} />
            <PickerS selectedValue={semestre_carrera} onValueChange={setSemestre} />

            <CheckBoxx />

            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

            <Button
                title="Registrarse"
                onPress={signUpWithEmail}
                color="#00bc70"
                disabled={loading}
            />

            <Link href="/login" style={styles.linkContainer}>
                <Text style={styles.link}>¿Ya tienes una cuenta? Inicia sesión aquí</Text>
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
    gap: 12,
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
