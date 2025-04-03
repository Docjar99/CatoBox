import { StatusBar } from "expo-status-bar";
import {View, Text, Pressable} from "react-native";
import { Screen } from "./Screen";
import {User} from "./User";

export function Main(){
    return(
        <Screen>
            <StatusBar style="auto" />
            <Text>Hola desde el main</Text>
            <Pressable>
                <User />

            </Pressable>
            <Text className="flex-1 items-center justify-center">Nombre</Text>
            <Text>Correo</Text>
            <Text>Carrera</Text>
        </Screen>        
    );
}