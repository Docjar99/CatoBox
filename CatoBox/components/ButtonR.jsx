import { Button, Alert } from "react-native"

export function ButtonR(){
    return(
        <Button
            title="Registrarse"
            color='black'
            onPress={() => Alert.alert('Inicio de sesión exitoso')}
        />
    )

}