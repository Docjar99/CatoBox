import { Text, TextInput, StyleSheet, View } from "react-native";
import { Screen } from "./Screen";
import {ButtonR} from "./ButtonR";
import { Link } from "expo-router";
import { EyeClosedIcon } from "./Icons";
import { Picker } from "@react-native-picker/picker";
import { CheckBoxx } from "./CheckBoxx";

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
                    <Picker
                        style={styles.listContainer}
                        
                    >
                        <Picker.Item label="Seleciona tu carrera" enabled = "false" />
                        <Picker.Item label="Chistemas" value="java" />
                        <Picker.Item label="Medicina" value="js" />
                        <Picker.Item label="Chistemas" value="java" />
                        <Picker.Item label="Medicina" value="js" />
                        <Picker.Item label="Chistemas" value="java" />
                        <Picker.Item label="Medicina" value="js" />

                    </Picker>

                </View>
                <CheckBoxx />
                <ButtonR />

                <Link href={""} style={styles.linkContainer} >
                    <Text style={styles.link}>¿Ya tienes una cuenta?</Text>
                </Link>
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
    listContainer:{
        marginTop:12,
    },
    linkContainer:{
        marginTop:12,

    },
    link:{
        color:'blue',
    }

}) 