import { Stack } from "expo-router";
import { View } from "react-native";
export default function Layout() {
    return(
            <Stack
                screenOptions={{
                headerStyle: { backgroundColor: "white" },
                headerTintColor: "blue",
                headerTitle: "",
            }}
            />

    );
}