import { Button,StyleSheet, Alert } from "react-native"

export function ButtonL(){
    return(
        <Button
            title="Iniciar sesion"
            color='black'
            borderRadius='222px'
            onPress={() => Alert.alert('Inicio de sesión exitoso')}
        />
    );

}
