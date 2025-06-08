import { StyleSheet, StatusBar } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "../components/Logo";
import { User } from "../components/User";

export default function Layout() {
    return (
        <SafeAreaProvider>
            <StatusBar backgroundColor="#00bc70" barStyle="light-content" />
            <SafeAreaView style={styles.container} edges={['top']}>
                <Stack
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: "#00bc70",
                            shadowColor: "transparent", // Sin sombra si deseas plano
                        },
                        headerTitleStyle: {
                            color: "#ffffff",
                            fontWeight: "bold",
                            fontSize: 20,
                        },
                        headerTintColor: "#ffffff",
                        headerTitle: "CatoBox",
                        headerLeft: () => <Logo />,
                        headerRight: () => <User />,
                    }}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
});
