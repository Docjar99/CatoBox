import { Text, TextInput, StyleSheet, View } from "react-native";
import { Screen } from "./Screen";
import {ButtonR} from "./ButtonR";
import { Link } from "expo-router";
import { EyeClosedIcon } from "./Icons";
import { Picker } from "@react-native-picker/picker";
import { CheckBoxx } from "./CheckBox";

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
                        testID="carrera"
                        accessibilityLabel="Selecciona tu carrera"  
                    >
                        <Picker.Item label="Chistemas" value="java" />
                        <Picker.Item label="Medicina" value="js" />
                    </Picker>
                    <Link href={""}> 
                    <Text style={styles.link}> Acepta los términos y condiciones </Text>
                    </Link>
                </View>

                <ButtonR />

                <Link href={""} >
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
    link:{
        textDecorationLine:'underline',
        color:'blue',
    }

}) 