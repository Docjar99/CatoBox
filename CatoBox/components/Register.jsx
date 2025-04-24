import { Alert, Button,Text, TextInput, StyleSheet, View } from "react-native";
import { Screen } from "./Screen";
import {ButtonR} from "./ButtonR";
import { Link } from "expo-router";
import { EyeClosedIcon } from "./Icons";
import { PickerR } from "./Picker";
import { CheckBoxx } from "./CheckBoxx";
import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export function Register(){
    const[email,setEmail] = useState('')
    const[password,setPassword]=useState('')
    const[loading,setLoading]=useState('')
    
    async function signUpWithEmail(){
        setLoading(true)
        const{
            data:{session},
            error,
        } = await supabase.auth.signUp({
            email:email,
            password:password,
        })
        if(error) Alert.alert(error.message)
        if(!session) Alert.alert('Revisa tu bandeja para verificar tu email')
        setLoading(false)

    }
    
    return(
        <Screen>
            <View style={styles.container}>
                <Text style = {styles.encabezado}>Registro de estudiante</Text>
                <View style={styles.register}>
                    <TextInput style = {styles.txt}
                        placeholder="Apellidos"
                    
                    />
                    <TextInput style = {styles.txt}
                        placeholder="Nombres"
                    
                    />
                    <TextInput style = {styles.txt}
                        onChangeText={(text)=> setEmail(text)}
                        placeholder="Correo electrónico"
                        value={email}
                        autoCapitalize={'none'}
                    
                    />
                    <TextInput style = {styles.txt}
                        placeholder="Contraseña"
                        secureTextEntry
                        onChangeText={(text)=> setPassword(text)}
                        value={password}
                        autoCapitalize="none"
                    />
                    <TextInput style = {styles.txt}
                        placeholder="Confirmar contraseña"
                        secureTextEntry
                    />
                <PickerR />

                </View>
                <CheckBoxx />
                <View style={styles.button}>
                    <Button
                        color="black"
                        title="Registrarse"
                        disabled={loading}
                        onPress={()=>signUpWithEmail()}
                    
                    />
                </View>


                <Link href={""} style={styles.linkContainer} >
                    <Text style={styles.link}>¿Ya tienes una cuenta?</Text>
                </Link>
            </View>
           


        </Screen>
    );
}
const styles = StyleSheet.create({
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
    }

}) 