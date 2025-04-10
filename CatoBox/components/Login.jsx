import {Text, TextInput, StyleSheet, View } from "react-native";
import { Screen } from "./Screen";
import { ButtonL } from "./ButtonL";

export function Login(){
    return(
        <Screen>
            <View style={styles.container}>
                <Text style={styles.header}>Inicio de sesión</Text>
                <View style={styles.login}>
                    <TextInput style = {styles.txt}
                        placeholder="Correo electrónico"
                    />
                    <TextInput style={styles.txt}
                        placeholder="Contraseña"
                        secureTextEntry
                    />

                </View>

            <ButtonL />
            </View>



        </Screen >
    );

}
const styles = StyleSheet.create({
    container:{
        padding: 16,
        flex:1,
        
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