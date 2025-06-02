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
                <View style={styles.login}>
                    <TextInput style = {styles.txt}
                        onChangeText={(text)=> setEmail(text)}
                        placeholder="Correo electrónico"
                        value={email}
                        autoCapitalize={'none'}
                    />
                    <TextInput style={styles.txt}
                        placeholder="Contraseña"
                        secureTextEntry
                        onChangeText={(text)=> setPassword(text)}
                        value={password}
                        autoCapitalize="none"
                    />

                </View>

            {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            {successMessage ? (
            <Text style={styles.successText}>{successMessage}</Text>
            ) : null}


            <View style={styles.button}>
                <Button 
                    color="black"
                    title="Iniciar sesion"
                    disabled={loading}
                    onPress={()=>signInWithEmail()}
                
                />
            </View>

                <Link href="/" style={styles.linkContainer}>
                    <Text style={styles.link}>¿No tienes cuenta? Regístrate aquí</Text>
                </Link>

            </View>



        </Screen >
    );

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        marginTop:20,
    },
    button:{
        width:150,

    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    login:{
        margin:12,
    },
    txt:{
        //fontsize: '15px',
        textAlign: 'center',
        //borderRadius: '20px',
        borderBottomColor:'grey',
        borderBottomWidth:2,
        margin:10,
    },

    linkContainer: {
        marginTop: 12,
        alignItems: 'center',
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
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