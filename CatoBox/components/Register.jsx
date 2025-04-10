import { Text, TextInput, StyleSheet, View } from "react-native";
import { Screen } from "./Screen";
import {ButtonR} from "./ButtonR";
import { Link } from "expo-router";
import { EyeClosedIcon } from "./Icons";
export function Register(){
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
                        placeholder="Correo electronico"
                    
                    />
                    <TextInput style = {styles.txt}
                        placeholder="Contraseña"
                        secureTextEntry
                    />
                    <TextInput style = {styles.txt}
                        placeholder="Confirmar contraseña"
                        secureTextEntry
                    />
                    <Text>Combobox</Text>
                    <Text>Checbox</Text>
                </View>

                <ButtonR />

                <Link href={""}>¿Ya tienes una cuenta?</Link>
            </View>
           


        </Screen>
    );
}
const styles = StyleSheet.create({
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


}) 