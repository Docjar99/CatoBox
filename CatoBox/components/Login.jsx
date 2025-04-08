import {Text, TextInput, StyleSheet, View } from "react-native";
import { Screen } from "./Screen";
import { ButtonL } from "./ButtonL";

export function Login(){
    return(
        <Screen>
        <Text style={styles.header}>Inicio de sesion</Text>
        <View style={styles.container}>
            <TextInput style = {styles.txt}
                placeholder="Correo electrónico"
            />
            <TextInput style={styles.txt}
                placeholder="Contraseña"
                secureTextEntry
            />

        </View>

        <ButtonL />


        </Screen >
    );

}
const styles = StyleSheet.create({
    container:{
        //margin:'10px',
        
    },
    header: {
        textAlign: 'center',
        //fontSize:'20px',
        fontWeight: 'bold',
    },
    txt:{
        //fontsize: '15px',
        textAlign: 'center',
        //borderRadius: '20px',
        borderColor:'#96ff64',
        borderWidth:4,
        margin:10,
    },


}) 