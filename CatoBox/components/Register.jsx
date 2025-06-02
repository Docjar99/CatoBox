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

    const[loading,setLoading]=useState(false)
    
    async function signUpWithEmail(){
        if(password!=confirm){
            Alert.alert('Error','Las contraseñas deben coincidir');
            return;
        }

        setLoading(true)
        try{
            const{data,error:signUpError} = await supabase.auth.signUp({
                email:email,
                password:password,
        });
        if(signUpError){
            Alert.alert('Error al crear la cuenta',signUpError.message);
            return;
        }
        const userId = data.user.id;
        const{error: insertError}=await supabase
            .from('usuario')
            .insert([
                {
                    id_usuario: userId,
                    nombres,
                    apaterno,
                    amaterno,
                    email,
                    carrera,
                    semestre_carrera,
                }
            ]
        );

        
        if (insertError) {
            Alert.alert('Error al registrar usuario', insertError.message);
          } else {
            Alert.alert('Registro exitoso', 'Tu cuenta ha sido registrada correctamente.');
          }
        } catch (error) {
          Alert.alert('Error inesperado', error.message);
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
    }

}) 