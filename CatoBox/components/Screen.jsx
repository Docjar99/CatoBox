import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export function Screen({ children }) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {children}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 16, // opcional
    },
});
