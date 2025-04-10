import { Text, TextInput, StyleSheet, View } from "react-native";
import { Screen } from "./Screen";
import {ButtonR} from "./ButtonR";
import { Link } from "expo-router";
export function Register(){
    return(
        <Screen>
            <View style={styles.container}>
                <Text style = {styles.encabezado}>Registro de estudiante</Text>
                <View style={styles.register}>
                    <TextInput style = {styles.txt}
                        placeholder="Nombre Completo"
                    
                    />
                    <TextInput style = {styles.txt}
                        placeholder="Correo electronico"
                    
                    />
                    <TextInput style = {styles.txt}
                        placeholder="Contraseña"
                    
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