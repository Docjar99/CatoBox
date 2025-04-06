import { StatusBar } from "expo-status-bar";
import {View, Text, Pressable} from "react-native";
import { Screen } from "./Screen";
import {User} from "./User";

export function Main(){
    return(
        <Screen>
            <StatusBar style="auto" />

        </Screen>        
    );
}