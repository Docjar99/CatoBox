import { Alert,Button, Text, TextInput, StyleSheet, View } from "react-native";
import React, {useState} from 'react';


import { Screen } from "./Screen";
import { ButtonL } from "./ButtonL";
import { supabase } from "../lib/supabase";



export function Login(){
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[loading,setLoading]=useState(false)

    async function signInWithEmail(){
        setLoading(true)
        const{error} = await supabase.auth.signInWithPassword({
            email:email,
            password:password,
        })
        if(error) Alert.alert(error.message)
            setLoading(false)
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
            <View style={styles.button}>
                <Button 
                    color="black"
                    title="Iniciar sesion"
                    disabled={loading}
                    onPress={()=>signInWithEmail()}
                
                />
            </View>

            </View>



        </Screen >
    );

}
const styles = StyleSheet.create({
    container:{
        padding: 16,
        flex:1,
        alignItems:'center',

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


}) 