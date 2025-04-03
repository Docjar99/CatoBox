import {Text} from "react-native";
import { Screen } from "./Screen";
import { TextInput } from "react-native-web";
import { ButtonL } from "./ButtonL";

export function Login(){
    return(
        <Screen>
        <Text>Login</Text>
        <Text>Ingrese su correo</Text>
        <TextInput
            placeholder="email"
        />
        <Text>Ingrese su contraseña</Text>
        <TextInput
            placeholder="contraseña"
            secureTextEntry
        />
        <ButtonL />


        </Screen >
    );

}