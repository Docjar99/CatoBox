import { Text, TextInput, StyleSheet, View } from "react-native";
import { Screen } from "./Screen";
import {ButtonR} from "./ButtonR";
import { Link } from "expo-router";
export function Register(){
    return(
        <Screen>
            <Text style = {styles.header}>Registro de estudiante</Text>
            <View style={styles.container}>
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


        </Screen>
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
        borderBottomColor:'grey',
        borderBottomWidth:2,
        margin:10,
    },


}) 