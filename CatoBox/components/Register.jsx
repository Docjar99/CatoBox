import { Text } from "react-native";
import { Screen } from "./Screen";
import { TextInput } from "react-native-web";
import {ButtonR} from "./ButtonR";
import { Link } from "expo-router";
export function Register(){
    return(
        <Screen>
            <Text>Registro de estudiante</Text>
            <TextInput
                placeholder="Nombre Completo"
            
            />
            <TextInput
                placeholder="Correo electronico"
            
            />
            <TextInput
                placeholder="Contraseña"
            
            />
            <Text>Combobox</Text>
            <Text>Checbox</Text>

            <ButtonR />
            <Link href={""}>¿Ya tienes una cuenta?</Link>


        </Screen>
    );
}