import react from "react";
import { StatusBar } from "expo-status-bar";

import { View, Text, StyleSheet, Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export function Screen({ children }) {

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.status}>
                <StatusBar 
                    style="auto"
                />

                    {children}

            </SafeAreaView>
        </SafeAreaProvider>

        );
        
}
const styles = StyleSheet.create({
    status:{
        flex:1,
        
    }
})