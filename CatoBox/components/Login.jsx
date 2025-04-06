import {Text} from "react-native";
import { Screen } from "./Screen";
import { TextInput } from "react-native-web";
import { ButtonL } from "./ButtonL";

export function Login(){
    return(
        <Screen>
        <Text>Inicio de sesion</Text>
        <TextInput
            placeholder="Correo electronico"
        />
        <TextInput
            placeholder="Contraseña"
            secureTextEntry
        />
        <ButtonL />


        </Screen >
    );

}