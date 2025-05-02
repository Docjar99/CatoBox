import { StyleSheet, StatusBar } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "../components/Logo";
import { User } from "../components/User";

export default function Layout() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top']}>
                <Stack
                    screenOptions={{
                        headerStyle: { backgroundColor: "lightgreen" },
                        headerTintColor: "black",
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
    }
});
