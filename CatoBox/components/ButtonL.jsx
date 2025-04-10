import { Button,StyleSheet, Alert, View } from "react-native"

export function ButtonL(){
    return(
        <View style={styles.button}>
            <Button
            title="Iniciar sesion"
            color='black'
            onPress={() => Alert.alert('Inicio de sesión exitoso')}
            />
        </View>

    );

}
const styles=StyleSheet.create({
    button:{
        width:150,

    },
})