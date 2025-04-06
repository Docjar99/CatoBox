import { Stack } from "expo-router";
import { View } from "react-native";
import {Logo} from "../components/Logo";
import {User} from "../components/User";

export default function Layout() {
    return(
        <View className="flex-1">
            <Stack
                screenOptions={{
                headerStyle: { backgroundColor: "lightgreen" },
                headerTintColor: "black",
                headerTitle: "CatoBox",
                headerLeft: () => <Logo/>,
                headerRight:()=> <User/>,
            }}
            />
        </View>


    );
}