import { Button, Alert, StyleSheet, View } from "react-native"

export function ButtonR(){
    return(
        <View style = {styles.button}>
            <Button 
                title="Registrarse"
                color='black'
                onPress={() => Alert.alert('Inicio de sesión exitoso')}

            />
        </View>


    )

}
const styles = StyleSheet.create({
    button:{
        width:150,
    },
})
