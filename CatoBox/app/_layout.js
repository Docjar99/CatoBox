import { Platform, StyleSheet, StatusBar } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "../components/Logo";
import { User } from "../components/User";

// Main Layout component that wraps the entire app
export default function Layout() {
    return (
        <SafeAreaProvider>
            <StatusBar style="dark" />
            <SafeAreaView style={styles.container} edges={['top']}>
                <Stack
                    screenOptions={{
                        headerStyle: { backgroundColor: "lightgreen" },
                        headerTintColor: "black",
                        headerTitle: "CatoBox",
                        headerLeft: () => <Logo />,
                        headerRight: () => <User />,
                        contentStyle: { 
                            backgroundColor: "white",
                            // Add padding only on mobile platforms
                            paddingBottom: Platform.OS === 'web' ? 0 : 20,
                        },
                        // Disable animations on web for better performance
                        animation: Platform.OS === 'web' ? 'none' : 'default',
                    }}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // Use viewport height on web to ensure full height
        height: Platform.OS === 'web' ? '100vh' : '100%',
    }
});
