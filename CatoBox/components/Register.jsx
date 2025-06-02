import { Alert, Button,Text, TextInput, StyleSheet, View } from 'react-native';
import { Screen } from "./Screen";
import { Link } from "expo-router";
import { EyeClosedIcon } from "./Icons";
import { PickerR } from "./PickerR";
import { PickerS } from "./PickerS";
import { CheckBoxx } from "./CheckBoxx";
import React, { useState } from "react";
import { supabase } from "../lib/supabase";



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
                <Text style = {styles.encabezado}>Registro de estudiante</Text>
                <View style={styles.register}>
                    <TextInput style = {styles.txt}
                        placeholder="Apellido Paterno"
                        onChangeText={(text)=>setApaterno(text)}
                        value={apaterno}

                    />
                    <TextInput style = {styles.txt}
                        placeholder="Apellido Materno"
                        onChangeText={(text)=>setAmaterno(text)}
                        value={amaterno}

                    />
                    <TextInput style = {styles.txt}
                        placeholder="Nombres"
                        onChangeText={(text)=>setNombres(text)}
                        value={nombres}

                    
                    />
                    <TextInput style = {styles.txt}
                        onChangeText={(text)=> setEmail(text)}
                        placeholder="Correo electrónico"
                        value={email}
                        autoCapitalize={'none'}
                    
                    />
                    <TextInput style = {styles.txt}         
                        value={password}
                        onChangeText={(text)=> setPassword(text)}
                        placeholder="Ingresa tu contraseña"
                        secureTextEntry
                    />
                    <TextInput style = {styles.txt}
                        placeholder="Confirmar contraseña"
                        secureTextEntry
                        onChangeText={(text)=> setConfirm(text)}
                        value={confirm}
                        autoCapitalize="none"
                        
                    />

                <PickerR 
                    selectedValue={carrera}
                    onValueChange={(value)=>setCarrera(value)}
                />
                <View style={styles.arti}></View>
                <PickerS 
                    selectedValue={semestre_carrera}
                    onValueChange={(value)=>setSemestre(value)}
                />
                </View>
                <CheckBoxx />
                <View style={styles.button}>
                    <Button
                        color="black"
                        title="Registrarse"
                        disabled={loading}
                        onPress={signUpWithEmail}
                    
                    />
                </View>

                {errorMessage ? (   // ERROR MENSAJITO
                <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}

                {successMessage ? ( // EEEEXITO
                <Text style={styles.successText}>{successMessage}</Text>
                ) : null}


                <Link href="/login" style={styles.linkContainer}>
                    <Text style={styles.link}>¿Ya tienes una cuenta? Inicia sesión aquí</Text>
                </Link>
            </View>
           


        </Screen>
    );
}
const styles = StyleSheet.create({
    arti:{
        margin:10,
    },
    button:{
        width:150,

    },
    container:{
        padding: 16,
        flex:1,
        alignItems:'center',
        
    },
    encabezado: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    register:{
        margin:16,
    },
    txt:{
        //fontsize: '15px',
        textAlign: 'center',
        //borderRadius: '20px',
        borderBottomColor:'grey',
        borderBottomWidth:2,
        margin:10,
        
    },

    linkContainer:{
        marginTop:12,

    },
    link:{
        color:'blue',
    },

    errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    },

    successText: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    },
}) 