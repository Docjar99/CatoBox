import { StatusBar } from "expo-status-bar";
import {View, Text} from "react-native";
import { Screen } from "./Screen";

export function Main(){
    return(
        <Screen>
            <StatusBar style="auto" />
            <Text>Hola</Text>
        </Screen>        
    );
}